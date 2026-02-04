import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
