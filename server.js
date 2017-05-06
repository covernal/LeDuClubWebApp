//Flag for server side render
delete process.env.BROWSER;
require('core-js/fn/object/assign');

var path = require('path');
var express = require('express');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var WebpackConfig = require('./webpack.config');
var compiler = webpack(WebpackConfig);
var config = require('./cfg/NodeJS');
var extIP = 'localhost';
var app = express();
var env = process.env.REACT_WEBPACK_ENV;

require('./cfg/NodeJS/express')(app);
require('./cfg/NodeJS/routes')(app);

//Server starts from here
if(env == 'local'){
  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: WebpackConfig.output.publicPath,
    noInfo: true,
    stats: {
      colors: true
    }
  }));

  app.use(require('webpack-hot-middleware')(compiler));

  app.get('/login*', function(req, res){
      res.sendFile(path.join(__dirname, '/src/index.html'));
  });
  app.get('/browsebooks*', function(req, res){
      res.sendFile(path.join(__dirname, '/src/index.html'));
  });
  app.get('/book*', function(req, res){
      res.sendFile(path.join(__dirname, '/src/index.html'));
  });
  app.get('/signup*', function(req, res){
      res.sendFile(path.join(__dirname, '/src/index.html'));
  });
  app.get('/forgot*', function(req, res){
      res.sendFile(path.join(__dirname, '/src/index.html'));
  });
  app.get('/member*', function(req, res){
      res.sendFile(path.join(__dirname, '/src/index.html'));
  });
  app.get('/admin*', function(req, res){
      res.sendFile(path.join(__dirname, '/src/index.html'));
  });
  app.get('/thisweek*', function(req, res){
      res.sendFile(path.join(__dirname, '/src/index.html'));
  });
  app.get('/my*', function(req, res){
      res.sendFile(path.join(__dirname, '/src/index.html'));
  });

  app.get('/', function(req, res){
      res.sendFile(path.join(__dirname, '/src/company/index.html'));
  }); 

  app.get('/terms', function(req, res){
      res.sendFile(path.join(__dirname, '/src/company/terms.html'));
  });

  app.get('/faq', function(req, res){
      res.sendFile(path.join(__dirname, '/src/company/faq.html'));
  });

  app.get('/careers', function(req, res){
      res.sendFile(path.join(__dirname, '/src/company/careers.html'));
  });

  app.get('/about-us', function(req, res){
      res.sendFile(path.join(__dirname, '/src/company/about-us.html'));
  });


  app.listen(config.port, function(err){
    if (err) {
      console.log(err);
      return;
    }

    console.log('Listening at non-production http://' + extIP + ':' + config.port);
  });
}else{
  app.get('/login*', function(req, res){
      res.sendFile(path.join(__dirname, '/src/index.html'));
  });
  app.get('/browsebooks*', function(req, res){
      res.sendFile(path.join(__dirname, '/src/index.html'));
  });
  app.get('/book*', function(req, res){
      res.sendFile(path.join(__dirname, '/src/index.html'));
  });
  app.get('/signup*', function(req, res){
      res.sendFile(path.join(__dirname, '/src/index.html'));
  });
  app.get('/forgot*', function(req, res){
      res.sendFile(path.join(__dirname, '/src/index.html'));
  });
  app.get('/member*', function(req, res){
      res.sendFile(path.join(__dirname, '/src/index.html'));
  });
  app.get('/admin*', function(req, res){
      res.sendFile(path.join(__dirname, '/src/index.html'));
  });
  app.get('/thisweek*', function(req, res){
      res.sendFile(path.join(__dirname, '/src/index.html'));
  });
  app.get('/my*', function(req, res){
      res.sendFile(path.join(__dirname, '/src/index.html'));
  });

  app.get('/', function(req, res){
      res.sendFile(path.join(__dirname, '/src/company/index.html'));
  }); 

  app.get('/terms', function(req, res){
      res.sendFile(path.join(__dirname, '/src/company/terms.html'));
  });

  app.get('/faq', function(req, res){
      res.sendFile(path.join(__dirname, '/src/company/faq.html'));
  });

  app.get('/careers', function(req, res){
      res.sendFile(path.join(__dirname, '/src/company/careers.html'));
  });

  app.get('/about-us', function(req, res){
      res.sendFile(path.join(__dirname, '/src/company/about-us.html'));
  });

  new WebpackDevServer(compiler, WebpackConfig.devServer)
  .listen(WebpackConfig.port, (err) => {
    if (err) {
      console.log(err);
    }
    console.log('Listening webpack dev server at https://' + extIP + ':' + WebpackConfig.port);
  });
  // 
  // app.listen((parseInt(process.env.PORT)+1), function(err){
  //   if (err) {
  //     console.log(err);
  //     return;
  //   }
  //
  //   console.log('Listening node server at http://' + extIP + ':' + (parseInt(process.env.PORT)+1));
  // });
}
