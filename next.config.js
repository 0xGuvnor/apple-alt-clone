/** @type {import('next').NextConfig} */

const dns = require("dns");

dns.setDefaultResultOrder("ipv4first");

module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      "rb.gy",
      "www.gravatar.com",
      "cdn.sanity.io",
      "lh3.googleusercontent.com",
    ],
  },
};
