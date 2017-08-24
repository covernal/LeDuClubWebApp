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
var fs = require('fs');

require('./cfg/NodeJS/express')(app);
require('./cfg/NodeJS/routes')(app);

function loadHTML(fp, callback) {
  fs.readFile(fp, 'utf8', function(err, main){
    fs.readFile(path.join(__dirname, '/src/company/_header.html'), 'utf8', function(err, header){
      fs.readFile(path.join(__dirname, '/src/company/_footer.html'), 'utf8', function(err, footer){
        var html = main.replace('{header}', header);
        html = html.replace('{footer}', footer);
        callback(html);
      });
    });
  });  
}

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
    loadHTML(path.join(__dirname, '/src/company/index.html'), function(html){
      res.send(html);
    });
  }); 

  app.get('/terms', function(req, res){
    loadHTML(path.join(__dirname, '/src/company/terms.html'), function(html){
      res.send(html);
    });      
  });

  app.get('/faq', function(req, res){
    loadHTML(path.join(__dirname, '/src/company/faq.html'), function(html){
      res.send(html);
    });      
  });

  //app.get('/careers', function(req, res){
  //  loadHTML(path.join(__dirname, '/src/company/careers.html'), function(html){
  //    res.send(html);
  //  });      
  //});

  app.get('/about-us', function(req, res){
    loadHTML(path.join(__dirname, '/src/company/about-us.html'), function(html){
      res.send(html);
    });      
  });

  app.get('/parents', function(req, res){
    loadHTML(path.join(__dirname, '/src/company/parents.html'), function(html){
      res.send(html);
    });      
  });

  app.get('/institutions', function(req, res){
    loadHTML(path.join(__dirname, '/src/company/institutions.html'), function(html){
      res.send(html);
    });      
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
    loadHTML(path.join(__dirname, '/src/company/index.html'), function(html){
      res.send(html);
    });
  }); 

  app.get('/terms', function(req, res){
    loadHTML(path.join(__dirname, '/src/company/terms.html'), function(html){
      res.send(html);
    });      
  });

  app.get('/faq', function(req, res){
    loadHTML(path.join(__dirname, '/src/company/faq.html'), function(html){
      res.send(html);
    });      
  });

  //app.get('/careers', function(req, res){
  //  loadHTML(path.join(__dirname, '/src/company/careers.html'), function(html){
  //    res.send(html);
  //  });      
  //});

  app.get('/about-us', function(req, res){
    loadHTML(path.join(__dirname, '/src/company/about-us.html'), function(html){
      res.send(html);
    });      
  });

  app.get('/parents', function(req, res){
    loadHTML(path.join(__dirname, '/src/company/parents.html'), function(html){
      res.send(html);
    });      
  });

  app.get('/institutions', function(req, res){
    loadHTML(path.join(__dirname, '/src/company/institutions.html'), function(html){
      res.send(html);
    });      
  });

  new WebpackDevServer(compiler, WebpackConfig.devServer)
  .listen(WebpackConfig.port, (err) => {
    if (err) {
      console.log(err);
    }
    console.log('Listening webpack dev server at https://' + extIP + ':' + WebpackConfig.port);
  });
  
  // app.listen((parseInt(process.env.PORT)), function(err){
  //   if (err) {
  //     console.log(err);
  //     return;
  //   }
  
  //   console.log('Listening node server at https://' + extIP + ':' + (parseInt(process.env.PORT)));
  // });
}
