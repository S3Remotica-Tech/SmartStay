import React from "react";
import ErrorBoundary from "./ErrorBountry";

const withErrorBoundary = (WrappedComponent, fallbackUI = null) => {
  return (props) => (
    <ErrorBoundary fallback={fallbackUI}>
      <WrappedComponent {...props} />
    </ErrorBoundary>
  );
};

export default withErrorBoundary;
