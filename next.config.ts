import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    eslint: {
        // Allow production builds to successfully complete even if
        // there are ESLint errors (useful while iterating/fixing)
        ignoreDuringBuilds: true,
    },
    typescript: {
        // Allow production builds to successfully complete even if
        // there are TypeScript errors (useful while iterating/fixing)
        ignoreBuildErrors: true,
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
    // Optimize for serverless deployment
    output: "standalone",
    // Ensure environment variables are available at build time
    env: {
        DATABASE_URL: process.env.DATABASE_URL,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        GOOGLE_ID: process.env.GOOGLE_ID,
        GOOGLE_SECRET: process.env.GOOGLE_SECRET,
        NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:
            process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
        STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    },
    // Server external packages for better performance
    serverExternalPackages: ["@prisma/client", "prisma"],
    /* config options here */
};

export default nextConfig;
