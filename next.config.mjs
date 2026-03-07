/** @type {import('next').NextConfig} */

// basePath is only needed on GitHub Pages (production).
// In local dev (npm run dev) it stays empty so the site loads at localhost:3000.
// REPO_BASEPATH is set by the GitHub Actions workflow as /<repo-name>,
// so this config works for any repo without hardcoding the name.
const isProd = process.env.NODE_ENV === 'production'
const basePath = isProd ? (process.env.REPO_BASEPATH || '/octaUnitech') : ''

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
