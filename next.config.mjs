/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: false },
  async redirects() {
    return [{ source: "/makler", destination: "/partner", permanent: true }];
  },
};

export default nextConfig;
