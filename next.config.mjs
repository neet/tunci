import mdxPlugin from "@next/mdx";
import createNextIntlPlugin from "next-intl/plugin";

const withMDX = mdxPlugin();
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
};

export default withMDX(withNextIntl(nextConfig));
