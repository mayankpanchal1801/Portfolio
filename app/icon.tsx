import { ImageResponse } from "next/og";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

/** Sage slab, stone monogram - the site mark at favicon scale. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#2F6B52",
          color: "#F3F1EA",
          fontSize: 320,
          fontWeight: 700,
          letterSpacing: "-0.06em",
        }}
      >
        M
      </div>
    ),
    size,
  );
}
