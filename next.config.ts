import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   webpack: (config) => {
    config.resolve.alias["expo-secure-store"] = false;
    return config;
  },
  reactStrictMode:false,
  images:{
    domains:["lh3.googleusercontent.com"]
  }
};

export default nextConfig;
