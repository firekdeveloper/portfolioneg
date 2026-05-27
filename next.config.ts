import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      {
        pathname: "/images/**",
      },
      {
        pathname: "/images/proyectos/**",
      },
    ],
  },
};

export default nextConfig;
