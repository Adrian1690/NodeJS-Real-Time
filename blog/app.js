var express = require('express'), routes = require('./routes');
var http = require('http');
var path = require('path');
var mongoskin = require('mongoskin'),
    dbUrl = process.env.MONGOHQ_URL || 'mongodb://@localhost:27017/blog',
    db = mongoskin.db(dbUrl,{safe:true}),
    collections = {
      articles : db.collection('articles'),
      users : db.collection('users')	
    };

var logger = require('morgan'),
    errorHandler = require('errorhandler'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override');

var app = express();
app.locals.appTitle = 'blog-de-Adrian';
//app.set('appName', 'hello-world');

app.use(function(req, res, next){
  if(!collections.articles || !collections.users) return next(new Error('No collections,'))	
  req.collections = collections;
  return next ();
});

// middlewar for auth
app.use(function(req, res, next){
  if(req.session && req.session.admin)
    res.locals.admin = true;
  next();
});

// Authorization

var authorize = function (req, res, next){
  if(req.session && req.session.admin)
    return next();
  else
    return res.send(401);//no autorized
    //res.render('login' ,{error : "Introduce your email and password file"});
    
};

// define port view and view engine
app.set('port', process.env.PORT || 3000 );
app.set('views', path.join(__dirname , 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(methodOverride());
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname,'public')));

// Implmenets auth
app.use(cookieParser('2CCC4ACD-6ED1-4844-9217-82131BDCB239'));
app.use(session({secret: '1C44774A-D649-4D44-9535-46E296EF984F'}));

// development only
if('development' === app.get('env')){
  app.use(errorHandler());
}

// pages and routes

/* app.get('/pruebas',function(req,res){
  db.collection("users",function(err,collection){
    collection.find().toArray(function(err, docs) {
          console.log("Printing docs from Array")
          docs.forEach(function(doc) {
            console.log("Doc from Array ");
            console.dir(doc);
          });
    });
 });
});
*/

app.get('/',routes.index);
app.get('/login',routes.user.login);
app.post('/login',routes.user.authenticate);
app.get('/logout',routes.user.logout);
app.get('/admin', authorize, routes.article.admin);
app.get('/post', authorize, routes.article.post);  
app.post('/post', authorize, routes.article.postArticle);
app.get('/articles/:slug',routes.article.show);

// rest api routes
app.get('api', authorize);
app.get('/api/articles', routes.article.list);
app.post('/api/articles', routes.article.add);
app.put('/api/articles/:id', routes.article.edit);
app.del('/api/articles/:id', routes.article.del);


// now middlewar

app.all('*', function(req, res){
  res.send(404);	
});

/*http.createServer(app)
    .listen(
	app.get('port'),
	function () {
	    console.log(
	    'Express.js server listening on port ' + app.get('port')
	);
	}
    );*/

var server = http.createServer(app);
var boot = function () {
  server.listen(app.get('port'), function(){
    console.info('Express server listening on port ' + app.get('port'));
  }); 
}
var shutdown = function() {
  server.close();
}
if (require.main === module) {
  boot(); 
}
else {
  console.info('Running app as a module')
  exports.boot = boot;
  exports.shutdown = shutdown;
  exports.port = app.get('port');
}
