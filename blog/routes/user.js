// get list

exports.list = function(req, res){
  res.send('respond with a resource');
};

// get login page

exports.login = function(req, res, next){
  res.render('login');
};

//get logout route

exports.logout = function(req, res, next){
  res.redirect('/');
};

// post authenticate route

exports.authenticate = function (req, res , next){
  res.redirect('/admin');
};
