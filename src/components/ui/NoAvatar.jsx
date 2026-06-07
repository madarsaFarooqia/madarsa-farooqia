import React from "react"

/**
 * Simple avatar placeholder when no image is available.
 * Supports different themes (primary, product, default) and can be rendered as a
 * circle or a rectangle via the `rounded` prop.
 *
 * Props
 * -----
 * - `size`      : numeric string (e.g. "64px") for width/height when circular.
 * - `rounded`   : boolean – true for fully rounded (circle).
 * - `theme`     : "primary" | "product" | "default" – determines background colour.
 * - `fontSize`  : optional custom font size.
 * - `name`      : first name (used for initials).
 * - `lastName`  : last name (optional, also used for initials).
 * - `color`     : optional background colour for "product" or default theme.
 * - `minWidth` / `minHeight`: fallback dimensions for rectangular layout.
 */
const NoAvatar = ({
  size = "64px",
  rounded = true,
  theme = "default",
  fontSize,
  name = "",
  lastName = "",
  color,
  minWidth = "64px",
  minHeight = "48px",
}) => {
  const initials = `${name?.charAt(0).toUpperCase() ?? ""}${lastName?.charAt(0).toUpperCase() ?? ""}`

  const baseStyle = {
    minWidth: rounded ? size : minWidth,
    minHeight: rounded ? size : minHeight,
    maxWidth: rounded ? size : undefined,
    maxHeight: rounded ? size : undefined,
    borderRadius: rounded ? "9999px" : "0.5rem",
    fontSize: fontSize || (rounded ? "17px" : "20px"),
    backgroundColor: color,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 500,
    color: "white",
    userSelect: "none",
    cursor: "default",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  }

  // Theme‑specific defaults
  if (theme === "primary") {
    baseStyle.backgroundColor = "#2C7A7B" // Tailwind teal‑600 substitute
    baseStyle.border = "2px solid #2C7A7B"
    baseStyle.color = "white"
  } else if (theme === "product") {
    baseStyle.backgroundColor = color || "#B54708" // orange‑800 like shade
    baseStyle.boxShadow = "0 2px 4px rgba(0,0,0,0.12)"
  } else {
    // default theme (fallback)
    baseStyle.backgroundColor = color || "#15B79E" // teal‑500
  }

  return (
    <div style={baseStyle} title={`${name} ${lastName}`}> {initials} </div>
  )
}

export default NoAvatar
