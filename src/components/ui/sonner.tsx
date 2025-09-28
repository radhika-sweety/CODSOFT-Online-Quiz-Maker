"use client";

import { Toaster as Sonner, ToasterProps } from "sonner@2.0.3";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--color-popover)",
          "--normal-text": "var(--color-popover-foreground)",
          "--normal-border": "var(--color-border)",
          "--success-bg": "var(--color-primary)",
          "--success-text": "var(--color-primary-foreground)",
          "--error-bg": "var(--color-destructive)",
          "--error-text": "var(--color-destructive-foreground)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
