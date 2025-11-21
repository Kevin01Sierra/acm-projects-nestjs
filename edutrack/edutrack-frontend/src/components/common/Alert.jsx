import { useState } from 'react';
import styles from './Alert.module.css';

const Alert = ({ 
  type = 'info', 
  message, 
  onClose,
  dismissible = true,
  icon 
}) => {
  const [visible, setVisible] = useState(true);

  const icons = {
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️',
  };

  const handleClose = () => {
    setVisible(false);
    if (onClose) onClose();
  };

  if (!visible) return null;

  return (
    <div className={`${styles.alert} ${styles[type]}`} role="alert">
      <div className={styles.alertContent}>
        <span className={styles.alertIcon}>
          {icon || icons[type]}
        </span>
        <span className={styles.alertMessage}>{message}</span>
      </div>
      
      {dismissible && (
        <button 
          className={styles.closeButton}
          onClick={handleClose}
          aria-label="Cerrar alerta"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default Alert;