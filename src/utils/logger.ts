/**
 * Logger utility per gestire console.log in modo sicuro
 * In produzione, i log vengono disabilitati a meno che VITE_ENABLE_CONSOLE_LOGS non sia 'true'
 */

const isDev = import.meta.env.DEV;
const enableLogs = import.meta.env.VITE_ENABLE_CONSOLE_LOGS === 'true';

export const logger = {
  log: (...args: any[]) => {
    if (isDev || enableLogs) {
      console.log(...args);
    }
  },
  
  error: (...args: any[]) => {
    // Gli errori vengono sempre loggati, ma in produzione potrebbero essere inviati a un servizio di tracking
    if (isDev || enableLogs) {
      console.error(...args);
    }
    // TODO: In produzione, invia errori a Sentry o servizio di tracking
  },
  
  warn: (...args: any[]) => {
    if (isDev || enableLogs) {
      console.warn(...args);
    }
  },
  
  debug: (...args: any[]) => {
    if (isDev || enableLogs) {
      console.debug(...args);
    }
  },
  
  info: (...args: any[]) => {
    if (isDev || enableLogs) {
      console.info(...args);
    }
  },
};

