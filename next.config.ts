import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    eslint: {
        // Allow production builds to successfully complete even if
        // there are ESLint errors (useful while iterating/fixing)
        ignoreDuringBuilds: true,
    },
    images: {
        // domains: ["plus.unsplash.com", "res.cloudinary.com"],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "plus.unsplash.com",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "images.unsplash.com",
                port: "",
                pathname: "/**",
            },
            {
                hostname: "res.cloudinary.com",
            },
        ],
    },
    /* config options here */
};

export default nextConfig;
