'use client'

import { ErrorBoundary } from "react-error-boundary";
import { useState } from "react";
import { ErrorModal } from "../ErrorModal";

export const AppErrorBoundary = ({ children }: {
  children: React.ReactNode;
}) => {
  const [error, setError] = useState<Error | null>(null);
  console.log(error);

  return (
    <>
      <ErrorBoundary
        fallbackRender={() => null}
        onError={(e) => setError(e)}
      >
        {children}
      </ErrorBoundary>

      {error && (
        <ErrorModal
          error={error.message}
          onClose={() => setError(null)}
        />
      )}
    </>
  );
};