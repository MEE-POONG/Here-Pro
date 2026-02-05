import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",

  images: {
    unoptimized: true,
  },
  turbopack: {},
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push({
        'bcrypt': 'commonjs bcrypt',
        'bcryptjs': 'commonjs bcryptjs',
      });
    }
    return config;
  },
};

export default nextConfig;
