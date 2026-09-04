import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("Page crashed:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="card" style={{ borderLeft: "5px solid #ef4444" }}>
          <div className="card-title" style={{ color: "#b91c1c" }}>
            ⚠️ या पेजवर एक error आलाय
          </div>
          <p style={{ color: "#6b7280", fontSize: 14 }}>
            {this.state.error?.message || "Unknown error"}
          </p>
          <button className="btn-primary" onClick={() => this.setState({ hasError: false, error: null })}>
            पुन्हा प्रयत्न करा
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
