import { site } from "@/constants/personal";
import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} - ${site.role}`;

/**
 * Social card, generated at build time. Replaces the /og.png that the
 * old metadata pointed at but which never existed in public/.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0A0C0B",
          color: "#F0EEE8",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        {/* Top rule + status */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #3A403C",
            paddingBottom: 24,
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#7C807B",
          }}
        >
          <span style={{ color: "#D97757" }}>Available for work</span>
          <span>Bengaluru · India</span>
        </div>

        {/* Name */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 132,
              fontWeight: 700,
              letterSpacing: -7,
              lineHeight: 1,
            }}
          >
            <span>{site.name}</span>
            <span style={{ color: "#D97757" }}>.</span>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 36,
              color: "#B6B3AB",
              maxWidth: 900,
              lineHeight: 1.35,
            }}
          >
            {`${site.role} - Next.js and React on top, FastAPI and PostgreSQL underneath.`}
          </div>
        </div>

        {/* Bottom rule + stack */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #3A403C",
            paddingTop: 24,
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#7C807B",
          }}
        >
          <span style={{ whiteSpace: "nowrap" }}>Next.js · FastAPI · PostgreSQL · AWS</span>
          <span style={{ color: "#F0EEE8", whiteSpace: "nowrap" }}>{site.domain}</span>
        </div>
      </div>
    ),
    size,
  );
}
