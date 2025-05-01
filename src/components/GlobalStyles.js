"use client";

export default function GlobalStyles({ children }) {
  return (
    <>
      <style jsx global>{`
        html, body {
          margin: 0;
          padding: 0;
          min-height: 100%;
          background: #101218 !important;
          color: #ffffff !important;
        }
      `}</style>
      {children}
    </>
  );
}
