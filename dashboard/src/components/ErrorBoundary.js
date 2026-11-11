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
    console.error("TradeFlow Dashboard error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="dashboard-fallback-screen">
          <h2>Unable to display TradeFlow Dashboard</h2>
          <p>An unexpected interface error occurred. Please reload to recover.</p>
          <button
            type="button"
            className="btn btn-blue"
            onClick={() => window.location.assign("/")}
          >
            Reload Dashboard
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

