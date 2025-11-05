// src/apiServices/apiService.ts

const API_URL = '/api/analyze'; // Nota: usa il proxy /api per bypassare CORS
const API_URL_IMAGE = '/api/analyze-image'; // Endpoint per le immagini

export interface OllamaResponse {
  response?: string;
  scam_level?: 'safe' | 'warning' | 'danger';
  confidence?: number;
  error?: string;
  score?: string;
}

export interface AnalyzeResult {
  text: string;
  score?: string;
}

/**
 * Controlla se il server API è disponibile
 */
export async function checkServerStatus(): Promise<boolean> {
  try {
    // Prova con una richiesta veloce
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 secondi di timeout
    
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message_text: 'ping' }), // Messaggio di test minimo
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    // Se è 404, il server/tunnel non è attivo o l'endpoint non esiste
    if (response.status === 404) {
      console.log('⚠️ Server risponde 404 - endpoint non trovato o tunnel non attivo');
      return false;
    }
    
    // Qualsiasi altra risposta (200, 400, 500, etc.) significa che il server è raggiungibile
    console.log('✅ Server disponibile, status:', response.status);
    return true;
  } catch (error) {
    // Errore di rete o timeout - server non disponibile
    console.log('❌ Server API non disponibile:', error);
    return false;
  }
}

/**
 * Invia un messaggio all'API e riceve la risposta dal chatbot
 */
export async function analyzeText(text: string, image?: File | null): Promise<AnalyzeResult | null> {
  if (!text || !text.trim()) {
    if (!image) return null;
  }

  try {
    const trimmedText = text.trim();
    console.log('🚀 Invio messaggio all\'API:', trimmedText);
    if (image) {
      console.log('🖼️ Immagine allegata:', image.name, `(${(image.size / 1024).toFixed(2)} KB)`);
    }

    let response: Response | null = null;
    let raw: string | null = null;

    if (image) {
      // Se c'è un'immagine, usa FormData
      // Prova diversi nomi di campo che il backend potrebbe aspettarsi
      const imageFieldNames = ['image', 'file', 'image_file', 'photo', 'upload'];
      
      let foundValid = false;
      
      for (const fieldName of imageFieldNames) {
        const formData = new FormData();
        formData.append('message_text', trimmedText || '');
        formData.append(fieldName, image);

        console.log(`📤 Tentativo con campo "${fieldName}":`);
        console.log('📤 - message_text:', trimmedText || '(vuoto)');
        console.log('📤 - ' + fieldName + ':', image.name, image.type, `(${(image.size / 1024).toFixed(2)} KB)`);

        try {
          const testResponse = await fetch(API_URL_IMAGE, {
            method: 'POST',
            body: formData,
          });

          console.log(`📊 Status risposta (campo "${fieldName}"): ${testResponse.status} ${testResponse.statusText}`);
          
          if (testResponse.ok) {
            const testRaw = await testResponse.text();
            console.log('📥 Test risposta RAW:', testRaw.substring(0, 200));
            
            // Se la risposta contiene "errore" o "error", prova il prossimo campo
            if (testRaw.toLowerCase().includes('errore') || 
                testRaw.toLowerCase().includes('error') ||
                testRaw.toLowerCase().includes('nessun') ||
                testRaw.trim().length === 0) {
              console.log(`⚠️ Campo "${fieldName}" non funziona, provo il successivo`);
              continue;
            }
            
            // Funziona! Salva la risposta
            console.log(`✅ Campo "${fieldName}" funziona!`);
            raw = testRaw;
            response = testResponse;
            foundValid = true;
            break;
          } else if (fieldName !== imageFieldNames[imageFieldNames.length - 1]) {
            // Non è l'ultimo campo, prova il prossimo
            console.log(`⚠️ HTTP ${testResponse.status} con campo "${fieldName}", provo il successivo`);
            continue;
          } else {
            // Ultimo tentativo, salva comunque per vedere l'errore
            raw = await testResponse.text();
            response = testResponse;
          }
        } catch (err) {
          console.error(`❌ Errore con campo "${fieldName}":`, err);
          if (fieldName === imageFieldNames[imageFieldNames.length - 1]) {
            throw err;
          }
          continue;
        }
      }
      
      // Se dopo tutti i tentativi non abbiamo una risposta valida
      if (!foundValid) {
        console.error('❌ Nessun campo immagine ha funzionato');
        if (!raw || !response) return null;
      }
    } else {
      // Altrimenti usa JSON come prima
      const requestBody = { message_text: trimmedText };

      response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
    }

    // Verifica che response sia stata assegnata
    if (!response) {
      console.error('❌ Risposta non disponibile');
      return null;
    }

    console.log(`📊 Status risposta: ${response.status} ${response.statusText}`);
    
    // Se non abbiamo già letto il raw (caso senza immagine), leggilo ora
    if (raw === null) {
      raw = await response.text();
    }
    
    console.log('📥 Risposta RAW:', raw);
    console.log('📥 Lunghezza risposta:', raw.length, 'caratteri');

    if (!response.ok) {
      console.error('❌ Risposta HTTP non OK:', raw);
      return null;
    }

    // Se la risposta è vuota
    if (!raw || raw.trim().length === 0) {
      console.warn('⚠️ Risposta vuota dall\'API');
      return null;
    }

    try {
      const data: OllamaResponse = JSON.parse(raw);
      console.log('📦 JSON parsato:', data);
      console.log('📦 Keys disponibili:', Object.keys(data));

      // Controlla se c'è un errore
      if (data.error) {
        console.error('❌ Errore nell\'API response:', data.error);
        return null;
      }

      // Estrai lo score (potrebbe essere un colore come "green", "yellow", "red" o un valore)
      let score: string | undefined = undefined;
      if (data.score) {
        score = String(data.score).trim().toLowerCase();
        console.log('🎯 Score trovato nel campo score:', score);
      }

      // Prova diversi campi per la risposta
      let responseText: string | null = null;
      if (data.response && typeof data.response === 'string' && data.response.trim().length > 0) {
        console.log('✅ Trovato data.response');
        responseText = data.response.trim();
      } else {
        // Se non c'è response, prova altri campi comuni
        const possibleFields = ['message', 'content', 'answer', 'text', 'result', 'output'];
        for (const field of possibleFields) {
          if (data[field as keyof OllamaResponse] && typeof data[field as keyof OllamaResponse] === 'string') {
            const value = String(data[field as keyof OllamaResponse]).trim();
            if (value.length > 0) {
              console.log(`✅ Trovato data.${field}`);
              responseText = value;
              break;
            }
          }
        }
      }

      // Se non trova nulla ma c'è un oggetto, restituisci il JSON formattato
      if (!responseText) {
        console.log('⚠️ Nessun campo testo trovato, restituisco JSON completo');
        responseText = JSON.stringify(data, null, 2);
      }

      // Cerca il colore nel testo della risposta dopo "score: " (con uno o più spazi)
      if (!score && responseText) {
        // Pattern per cercare "score: <colore>" o "score:<colore>" (case insensitive)
        const scorePattern = /score\s*:\s*([a-zA-Z]+)/i;
        const match = responseText.match(scorePattern);
        if (match && match[1]) {
          score = match[1].trim().toLowerCase();
          console.log('🎯 Score trovato nel testo dopo "score:":', score);
        }
      }

      // Rimuovi il testo dello score dal messaggio se presente
      if (score && responseText) {
        const scorePattern = /score\s*:\s*[a-zA-Z]+/gi;
        responseText = responseText.replace(scorePattern, '').trim();
        // Rimuovi anche eventuali spazi multipli
        responseText = responseText.replace(/\s+/g, ' ').trim();
      }

      return {
        text: responseText,
        score: score
      };
    } catch (parseError) {
      console.error('❌ Errore nel parsing JSON:', parseError);
      console.log('📥 Tentativo di restituire risposta come testo:', raw.substring(0, 200));
      // Se non è JSON, cerca comunque lo score nel testo
      let score: string | undefined = undefined;
      let responseText = raw.trim();
      
      // Cerca il pattern "score: <colore>" (case insensitive, con uno o più spazi)
      const scorePattern = /score\s*:\s*([a-zA-Z]+)/i;
      const scoreMatch = responseText.match(scorePattern);
      if (scoreMatch && scoreMatch[1]) {
        score = scoreMatch[1].trim().toLowerCase();
        console.log('🎯 Score trovato nel testo dopo "score:":', score);
        
        // Rimuovi il testo dello score dal messaggio
        responseText = responseText.replace(scorePattern, '').trim();
        // Rimuovi anche eventuali spazi multipli
        responseText = responseText.replace(/\s+/g, ' ').trim();
      }
      
      // Se non è JSON, restituisci la stringa direttamente se non è vuota
      if (responseText.length > 0) {
        return {
          text: responseText,
          score: score
        };
      }
      return null;
    }
  } catch (error) {
    console.error('❌ Errore nella chiamata API:', error);
    return null;
  }
}
