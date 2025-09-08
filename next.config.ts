import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
