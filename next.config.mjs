// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',          // generate a static site into /out
  trailingSlash: true,       // ensures folder-style URLs work on gateways
  assetPrefix: './',         // make asset paths relative (works under a CID path)
  images: { unoptimized: true }, // disable next/image optimizer for static hosting
  basePath: '',              // explicit for clarity
};
export default nextConfig;