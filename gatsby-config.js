module.exports = {
  siteMetadata: {
    siteTitle: `BANKEDOCS`,
    defaultTitle: `BANKEDOCS`,
    siteTitleShort: `Banke Docs`,
    siteDescription: `Dokumentation og cheat sheet til hvordan du hurtigt kommer i gang med BANKEHUSET`,
    siteUrl: `https://docs.bankehuset.info`,
    siteAuthor: `@mikkelrask`,
    siteImage: `/bankebanner.png`,
    siteLanguage: `dk`,
    themeColor: `#D95959`,
    basePath: `/`,
  },
  plugins: [
    {
      resolve: `@rocketseat/gatsby-theme-docs`,
      options: {
        configPath: `src/config`,
        docsPath: `src/docs`,
        yamlFilesPath: `src/yamlFiles`,
        repositoryUrl: `https://github.com/jpedroschmitz/rocketdocs`,
        baseDir: `examples/gatsby-theme-docs`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Rocket Docs`,
        short_name: `Rocket Docs`,
        start_url: `/`,
        background_color: `#fafafa`,
        display: `standalone`,
        icon: `static/favicon.png`,
      },
    },
    `gatsby-plugin-sitemap`,
    // {
    //   resolve: `gatsby-plugin-google-analytics`,
    //   options: {
    //     trackingId: `YOUR_ANALYTICS_ID`,
    //   },
    // },
    `gatsby-plugin-remove-trailing-slashes`,
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: `https://rocketdocs.netlify.app`,
      },
    },
    `gatsby-plugin-offline`,
  ],
};
