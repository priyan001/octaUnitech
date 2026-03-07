/** @type {import('next').NextConfig} */

// basePath is only needed on GitHub Pages (production).
// In local dev (npm run dev) it stays empty so the site loads at localhost:3000.
const isProd = process.env.NODE_ENV === 'production'
const basePath = isProd ? '/octaUnitech' : ''

const nextConfig = {
  output: 'export',
  basePath,
  assetPrefix: basePath,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  reactCompiler: true,
};

export default nextConfig;
