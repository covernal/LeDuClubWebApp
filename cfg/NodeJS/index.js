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
    dev: {
      LEANCLOUD_APP_ID: 'i9cYx8YVlzbj2O4IdeXDKqAG-gzGzoHsz',
      LEANCLOUD_APP_KEY: 'b3GKIeOqiIHyewQtUjn6pXKS'
    },
    dist: {
      LEANCLOUD_APP_ID: 'AOIO1DF0fmN8YlH8S3FlQ3KB-gzGzoHsz',
      LEANCLOUD_APP_KEY: 'FLofm5jDmXf1GS94W60MRhqo'
    }
  }
};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = settings;
