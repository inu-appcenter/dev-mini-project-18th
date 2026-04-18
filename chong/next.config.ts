import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: false,
    webpack(config) {
        // svgr 설정 추가
        config.module.rules.push({
            test: /\.svg$/i,
            use: ["@svgr/webpack"],
        });

        return config;
    },
    turbopack: {
        rules: {
            "*.svg": {
                loaders: ["@svgr/webpack"],
                as: "*.js",
            },
        },
    },
    async rewrites() {
    return [
      {
        source: "/api/proxy/:path*",
        destination: `${process.env.SERVER_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
