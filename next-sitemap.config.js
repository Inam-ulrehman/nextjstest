module.exports = {
  siteUrl: process.env.SITE_URL,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },

      {
        userAgent: '*',
        disallow: ['/dashboard', '/user', '/sample'],
      },
    ],
  },
  exclude: ['/dashboard'],
}
