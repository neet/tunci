import mdxPlugin from "@next/mdx";
import createNextIntlPlugin from "next-intl/plugin";
import path from "path";

const __dirname = import.meta.dirname;

const withMDX = mdxPlugin();
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],

  // https://github.com/huggingface/transformers.js/issues/1026
  webpack: (config) => {
    config.resolve.alias["@huggingface/transformers"] = path.resolve(
      __dirname,
      "node_modules/@huggingface/transformers",
    );
    config.resolve.alias = {
      ...config.resolve.alias,
      sharp$: false,
      "onnxruntime-node$": false,
    };
    return config;
  },
};

export default withMDX(withNextIntl(nextConfig));
