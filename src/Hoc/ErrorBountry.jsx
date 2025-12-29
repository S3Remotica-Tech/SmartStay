import React from "react";
import { BiSolidError } from "react-icons/bi";
import PropTypes from "prop-types";
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };

  }

  // componentDidCatch(error, errorInfo) {
  //   // console.error("Error Boundary Caught:", error, errorInfo);
  // }

  render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          aria-live="assertive"
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 18,
            padding: 24,
            fontFamily: "Gilroy, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
            color: "#111827",
            textAlign: "center",
          }}
        >

          <    BiSolidError style={{ width: 220, height: 120 , color:"#FFB300"}}/>

          <div style={{ maxWidth: 540 }}>
            <h2 style={{ margin: 0, fontSize: 22, fontWeight: 600 }}>Something went wrong</h2>
            <p style={{ marginTop: 8, marginBottom: 0, fontSize: 15, color: "#6B7280" }}>
              Please try again later
            </p>
          </div>

          {/* <div style={{ display: "flex", gap: 12, marginTop: 6 }}>
        <button
          // onClick={onRetry}
          style={{
            padding: "10px 16px",
            fontSize: 14,
            fontWeight: 600,
            borderRadius: 10,
            border: "none",
            cursor: "pointer",
            background: "#1E45E1",
            color: "#fff",
            boxShadow: "0 6px 12px rgba(30,69,225,0.12)",
          }}
        >
          Retry
        </button>

     
      </div> */}
        </div>
      );
    }
    return this.props.children;
  }
}
ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};
export default ErrorBoundary;
