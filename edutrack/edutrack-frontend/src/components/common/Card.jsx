import styles from './Card.module.css';

const Card = ({ 
  children, 
  title, 
  subtitle,
  actions,
  hoverable = false,
  className = '',
  ...props 
}) => {
  const cardClasses = [
    styles.card,
    hoverable && styles.hoverable,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={cardClasses} {...props}>
      {(title || subtitle) && (
        <div className={styles.cardHeader}>
          {title && <h3 className={styles.cardTitle}>{title}</h3>}
          {subtitle && <p className={styles.cardSubtitle}>{subtitle}</p>}
        </div>
      )}
      
      <div className={styles.cardBody}>
        {children}
      </div>
      
      {actions && (
        <div className={styles.cardActions}>
          {actions}
        </div>
      )}
    </div>
  );
};

export default Card;