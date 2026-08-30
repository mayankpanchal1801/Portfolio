"use client";

import { useEffect, useState } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    console.error("Global uncaught error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: "#FBF8F3",
          color: "#16140F",
          fontFamily:
            'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }}
      >
        <main
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem 1.5rem",
          }}
        >
          <div style={{ maxWidth: "600px", width: "100%" }}>
            <div
              style={{
                display: "inline-block",
                padding: "0.25rem 0.75rem",
                borderRadius: "9999px",
                backgroundColor: "#F6E5DE",
                border: "1px solid #E9BFB1",
                color: "#A82A0D",
                fontSize: "0.75rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              System Error · 500
            </div>

            <h1
              style={{
                marginTop: "1.5rem",
                fontSize: "clamp(2rem, 6vw, 3.5rem)",
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
              }}
            >
              Application error<span style={{ color: "#D93A16" }}>.</span>
            </h1>

            <p
              style={{
                marginTop: "1.25rem",
                fontSize: "1.1rem",
                lineHeight: 1.6,
                color: "#423E36",
              }}
            >
              A critical error occurred while rendering the application. You can
              retry loading the page or reload your browser.
            </p>

            <div
              style={{
                marginTop: "2rem",
                display: "flex",
                flexWrap: "wrap",
                gap: "0.75rem",
              }}
            >
              <button
                type="button"
                onClick={reset}
                style={{
                  padding: "0.85rem 1.5rem",
                  backgroundColor: "#D93A16",
                  color: "#FFFFFF",
                  border: "none",
                  borderRadius: "3px",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                }}
              >
                Try again
              </button>

              <button
                type="button"
                onClick={() => {
                  if (typeof window !== "undefined") {
                    window.location.reload();
                  }
                }}
                style={{
                  padding: "0.85rem 1.5rem",
                  backgroundColor: "transparent",
                  color: "#16140F",
                  border: "1px solid #C3B8A6",
                  borderRadius: "3px",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                }}
              >
                Reload page
              </button>
            </div>

            {error && (
              <div style={{ marginTop: "2.5rem", borderTop: "1px solid #DDD5C8", paddingTop: "1.5rem" }}>
                <button
                  type="button"
                  onClick={() => setShowDetails((v) => !v)}
                  style={{
                    background: "none",
                    border: "none",
                    padding: 0,
                    fontSize: "0.75rem",
                    color: "#6E6759",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    cursor: "pointer",
                  }}
                >
                  {showDetails ? "▼ Hide error details" : "▶ Show error details"}
                </button>

                {showDetails && (
                  <div
                    style={{
                      marginTop: "1rem",
                      padding: "1rem",
                      backgroundColor: "#F3EEE6",
                      borderRadius: "4px",
                      fontSize: "0.8rem",
                      fontFamily: "monospace",
                      overflowX: "auto",
                    }}
                  >
                    <div><strong>Message:</strong> {error.message || "Unknown error"}</div>
                    {error.digest && <div><strong>Digest:</strong> {error.digest}</div>}
                    {error.stack && (
                      <pre style={{ marginTop: "0.5rem", fontSize: "0.75rem", whiteSpace: "pre-wrap" }}>
                        {error.stack}
                      </pre>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </body>
    </html>
  );
}
