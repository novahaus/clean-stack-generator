const path = require('path');
<% if (pwa) { %>
const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");
<% } %>
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const config = {
  trailingSlash: true,
  <% if (pwa) { %>
    pwa: {
      dest: "public",
      runtimeCaching,
      disable: process.env.NODE_ENV === "development",
    },
  <% } %>
  webpack: (config, { defaultLoaders }) => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      include: [path.resolve(__dirname, './source')],
      use: [defaultLoaders.babel],
    });

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  rewrites() {
    return [
      {
        source: '/:any*',
        destination: '/',
      },
    ];
  },
};

module.exports = withBundleAnalyzer(<% if (pwa) { %> withPWA( <% } %>config<% if (pwa) { %> ) <% } %>);
