import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    HUGGING_FACE_API_KEY: process.env.HUGGING_FACE_API_KEY,
  },
};

export default nextConfig;
