/** @type {import('next').NextConfig} */
// next.config.mjs ou next.config.js
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Desativa completamente o ESLint
  },
  typescript: {
    ignoreBuildErrors: true,  // Opcional: se quiser desativar TS também
  }
}

export default nextConfig;
