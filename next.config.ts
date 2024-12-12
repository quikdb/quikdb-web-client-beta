import { config, withAnalyzer, withSentry } from './@quikdb/next-config';
import type { NextConfig } from 'next';

let nextConfig: NextConfig = { ...config };

if (process.env.VERCEL) {
  nextConfig = withSentry(nextConfig);
}

if (process.env.ANALYZE === 'true') {
  nextConfig = withAnalyzer(nextConfig);
}

export default nextConfig;
