/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Every route here is prerendered at build time — there is no server-side
  // rendering, no API route and no revalidation — so the site ships as plain
  // static files. Any host can serve `out/` directly; no Next.js runtime and
  // no platform adapter is involved.
  output: "export",

  // Static export has no image optimizer at request time. Assets are
  // pre-compressed to WebP instead, so this costs nothing.
  images: { unoptimized: true },
};

export default nextConfig;
