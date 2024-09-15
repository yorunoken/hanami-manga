/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{ hostname: "cdn.discordapp.com" }],
    },
};

export default nextConfig;
