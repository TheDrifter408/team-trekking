import { useEffect } from 'react';
import styles from '../../styles/modal.module.css';
import { ModalProps } from '../../types/PropTypes.ts';

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = 500,
  scrollbarTheme = 'custom',
  // Simplified button props
  showLeftButton = false,
  leftButtonText = 'Cancel',
  leftButtonOnClick,
  leftButtonDisabled = false,
  leftButtonVariant = 'ghost',

  showRightButton = true,
  rightButtonText = 'Confirm',
  rightButtonOnClick,
  rightButtonDisabled = false,
  rightButtonVariant = 'primary',
}: ModalProps) => {
  // Close modal with escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scrolling when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      // Re-enable body scrolling when modal is closed
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  // Determine which scrollbar class to use
  const getScrollbarClass = () => {
    switch (scrollbarTheme) {
      case 'dark':
        return styles.darkScrollbar;
      case 'primary':
        return styles.primaryScrollbar;
      case 'custom':
      default:
        return styles.customScrollbar;
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalBackdrop} onClick={onClose} />
      <div className={styles.modalContainer} style={{ maxWidth: maxWidth }}>
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>{title}</h3>
          <button
            onClick={onClose}
            className={styles.closeButton}
            aria-label="Close modal"
          >
            <svg
              className={styles.closeIcon}
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className={`${styles.modalBody} ${getScrollbarClass()}`}>
          {children}
        </div>
        <div className={styles.modalFooter}>
          <div>
            {showLeftButton && (
              <button
                onClick={leftButtonOnClick}
                className={`${styles.button} ${styles.leftButton} ${styles[leftButtonVariant]}`}
                disabled={leftButtonDisabled}
              >
                {leftButtonText}
              </button>
            )}
          </div>
          <div>
            {showRightButton && (
              <button
                onClick={rightButtonOnClick}
                className={`${styles.button} ${styles.rightButton} ${styles[rightButtonVariant]}`}
                disabled={rightButtonDisabled}
              >
                {rightButtonText}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
