import React from "react";
import css from "./Loading.module.css";

interface LoadingIndicatorProps {
  size?: "small" | "medium" | "large";
  overlay?: boolean;
}

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  size = "medium",
  overlay = false,
}) => {
  const spinnerClass = [css.spinner, css["spinner-" + size]].join(" ");

  const content = (
    <output className={css.container} aria-busy="true">
      <div className={spinnerClass} aria-hidden="true" />
    </output>
  );

  if (overlay) {
    return <div className={css.overlay}>{content}</div>;
  }

  return content;
};

export default LoadingIndicator;
