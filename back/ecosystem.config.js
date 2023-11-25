// eslint-disable-next-line @typescript-eslint/no-var-requires
const { name } = require('./package.json');

module.exports = {
  apps: [
    {
      name,
      script: './dist/src/main/main.js',
      env_development: {
        NODE_ENV: 'development',
      },
      env_homologation: {
        NODE_ENV: 'homologation',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
