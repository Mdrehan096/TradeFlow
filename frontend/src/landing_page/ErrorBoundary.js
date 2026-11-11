import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("TradeFlow UI error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container py-5 text-center">
          <h2 className="mb-3">Something went wrong</h2>
          <p className="text-muted mb-4">
            Please reload the page or return to the TradeFlow homepage.
          </p>
          <button
            type="button"
            className="btn btn-primary"
            style={{ backgroundColor: "#387ed1", borderColor: "#387ed1" }}
            onClick={() => window.location.assign("/")}
          >
            Reload TradeFlow
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

