import React from 'react'
import './Card.css'

interface CardHeaderProps {
  children?: React.ReactNode
  className?: string
  icon?: React.ReactNode
  title?: string
  subtitle?: string
}

const CardHeader: React.FC<CardHeaderProps> = ({ 
  children, 
  className = '',
  icon,
  title,
  subtitle
}) => {
  return (
    <div className={`card-header ${className}`}>
      {icon && <div className="card-header__icon">{icon}</div>}
      <div className="card-header__content">
        {title && <h3 className="card-header__title">{title}</h3>}
        {subtitle && <p className="card-header__subtitle">{subtitle}</p>}
        {children}
      </div>
    </div>
  )
}

export default CardHeader
