import { site } from "@/constants/personal";
import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} — ${site.role}`;

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
          background: "#FBF8F3",
          color: "#16140F",
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
            borderBottom: "2px solid #DDD5C8",
            paddingBottom: 24,
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#6E6759",
          }}
        >
          <span style={{ color: "#A82A0D" }}>Available for work</span>
          <span>Bengaluru · India</span>
        </div>

        {/* Name */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 132,
              fontWeight: 700,
              letterSpacing: -6,
              lineHeight: 1,
            }}
          >
            <span>{site.name}</span>
            <span style={{ color: "#D93A16" }}>.</span>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 36,
              color: "#423E36",
              maxWidth: 900,
              lineHeight: 1.35,
            }}
          >
            {`${site.role} — Next.js and React on top, FastAPI and PostgreSQL underneath.`}
          </div>
        </div>

        {/* Bottom rule + stack */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "2px solid #DDD5C8",
            paddingTop: 24,
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#6E6759",
          }}
        >
          <span style={{ whiteSpace: "nowrap" }}>Next.js · FastAPI · PostgreSQL · AWS</span>
          <span style={{ color: "#16140F", whiteSpace: "nowrap" }}>{site.domain}</span>
        </div>
      </div>
    ),
    size,
  );
}
