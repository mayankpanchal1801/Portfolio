import { ImageResponse } from "next/og";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

/** Vermilion slab, ink monogram - the site mark at favicon scale. */
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
          background: "#D93A16",
          color: "#FBF8F3",
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
