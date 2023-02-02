/* eslint-disable no-useless-escape */
const config = require('./config');

const plugins = [
  'gatsby-transformer-react-docgen',
  {
    resolve: 'gatsby-plugin-react-svg',
    options: {
      rule: {
        include: /\.svg$/,
      },
    },
  },
  'gatsby-transformer-sharp',
  'gatsby-plugin-sharp',
  {
    resolve: `gatsby-plugin-layout`,
    options: {
      component: require.resolve(`./src/templates/docs.jsx`),
    },
  },
  'gatsby-plugin-styled-components',
  {
    resolve: 'gatsby-plugin-mdx',
    options: {
      gatsbyRemarkPlugins: [
        {
          resolve: 'gatsby-remark-images',
          options: {
            maxWidth: 1035,
            sizeByPixelDensity: true,
          },
        },
        {
          resolve: 'gatsby-remark-copy-linked-files',
        },
        {
          resolve: 'gatsby-remark-autolink-headers',
          options: {
            className: 'anchor',
          },
        },
      ],
      extensions: ['.mdx'],
    },
  },
  'gatsby-plugin-remove-trailing-slashes',
  'gatsby-plugin-react-helmet',
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'docs',
      path: `${__dirname}/content/`,
    },
  },
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'yoga',
      path: `../yoga`,
    },
  },
  {
    resolve: `gatsby-plugin-web-font-loader`,
    options: {
      google: {
        families: ['Rubik:300,400,500,700,900,300i,400i,500i,700i,900i'],
      },
    },
  },
  'gatsby-plugin-typescript',
];

module.exports = {
  siteMetadata: {
    title: config.siteMetadata.title,
    description: config.siteMetadata.description,
    siteUrl: config.gatsby.siteUrl,
    github: {
      componentsPath: config.siteMetadata.github.componentsPath,
    },
  },
  plugins,
  pathPrefix: '/yoga',
};
