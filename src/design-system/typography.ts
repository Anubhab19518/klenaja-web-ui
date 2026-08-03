/** Typography tokens preserve the font family and scale already in use. */
export const typography = {
  fontHeading: "var(--ds-font-heading)",
  fontBody: "var(--ds-font-body)",
  displayXL: "clamp(3.5rem, 6vw, 5.5rem)",
  displayLG: "clamp(2.5rem, 4vw, 4rem)",
  headingLG: "2.25rem",
  headingMD: "1.75rem",
  headingSM: "1.25rem",
  bodyLG: "1.125rem",
  bodyMD: "1rem",
  caption: "0.75rem",
} as const;
