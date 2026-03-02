/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',           // static export for GitHub Pages
  basePath: '/octaUnitech',   // must match the GitHub repo name (case-sensitive)
  assetPrefix: '/octaUnitech',
  images: {
    unoptimized: true,        // required for static export
  },
  // Expose basePath to client components (used by Navbar logo)
  env: {
    NEXT_PUBLIC_BASE_PATH: '/octaUnitech',
  },
  reactCompiler: true,
};

export default nextConfig;
