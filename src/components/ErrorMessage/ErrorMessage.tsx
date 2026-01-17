import React from "react";
import css from "./ErrorMessage.module.css";

interface ErrorMessageProps {
  error: string | Error;
  onRetry?: () => void;
  onDismiss?: () => void;
  title?: string;
  type?: "error" | "warning" | "info";
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  error,
  onRetry,
  onDismiss,
  title = "Сталася помилка",
  type = "error",
}) => {
  const errorText = error instanceof Error ? error.message : error;

  return (
    <div
      className={`${css.container} ${css[type]}`}
      role="alert"
      aria-live="assertive"
    >
      <div className={css.header}>
        <h3 className={css.title}>{title}</h3>

        {onDismiss && (
          <button
            className={css.dismiss}
            onClick={onDismiss}
            aria-label="Закрити"
          >
            ×
          </button>
        )}
      </div>

      <p className={css.text}>{errorText}</p>

      {onRetry && (
        <div className={css.actions}>
          <button className={css.retryButton} onClick={onRetry}>
            Спробувати знову
          </button>
        </div>
      )}
    </div>
  );
};

export default ErrorMessage;
