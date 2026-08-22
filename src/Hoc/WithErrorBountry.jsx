
import React from "react";
import ErrorBoundary from "./ErrorBountry";

const withErrorBoundary = (WrappedComponent, fallbackUI = null) => {
  const ComponentWithErrorBoundary = (props) => (
    <ErrorBoundary fallback={fallbackUI}>
      <WrappedComponent {...props} />
    </ErrorBoundary>
  );

  ComponentWithErrorBoundary.displayName = `withErrorBoundary(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return ComponentWithErrorBoundary;
};

export default withErrorBoundary;

