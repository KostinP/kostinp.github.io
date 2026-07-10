import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.js");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Only static-export during the real production build: "next dev" also
  // enforces output:'export' constraints (no dynamic routes), which would
  // break the Keystatic admin route used for local content editing.
  ...(process.env.NODE_ENV === "production" ? { output: "export" } : {}),
  trailingSlash: true,
  images: { unoptimized: true },
};

export default withNextIntl(nextConfig);
