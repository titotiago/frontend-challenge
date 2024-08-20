module.exports = {
  swcMinify: true,
  compiler: {
    emotion: true,
  },
  images: {
    formats: ["image/webp"],
    domains: ["upload.wikimedia.org", "images-na.ssl-images-amazon.com"],
  },
  async rewrites() {
    return [
      {
        source: "/graphql",
        destination: process.env.GRAPHQL_API_URL,
      },
    ];
  },
  reactStrictMode: true,
};
