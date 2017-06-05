'use strict';

var path = require('path');

var settings = {
  env: process.env.NODE_ENV,
  root: path.dirname(require.main.filename),
  port: process.env.PORT || 9000,
  leancloud: {
    local:{
      LEANCLOUD_APP_ID: 'i9cYx8YVlzbj2O4IdeXDKqAG-gzGzoHsz',
      LEANCLOUD_APP_KEY: 'b3GKIeOqiIHyewQtUjn6pXKS'
    },
    dev: {},
    dist: {}
  }
};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = settings;
