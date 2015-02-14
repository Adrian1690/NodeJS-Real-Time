// get articles page

exports.show = function(req, res, next){
  if(!req.params.slug) return next(new Error('No article Slug'));
  req.collections.articles.findOne({slug: req.params.slug}, function(error, article){
    if(error) return next(error);
    if(!article.published) return res.send(401);
    res.render('article', article);
  })
};


// get Articles Api

exports.list = function(req, res, next){
  req.collections.articles.find({}).toArray(function(error, articles){
    if(error) return next(error);
    res.send({articles : articles});
  });
};


// post Article Api

exports.add =  function(req, res, next){
  if (!req.body.article) return next(new Error('No articles paylad'));
  var article = req.body.article;
  article.published = false;
  req.collections.articles.insert(article, function(error, articleResponse){
    if (error) return next(error);
    res.send(articleResponse);
  });
};

//put article api

exports.edit =  function(req, res, next){
  if(!req.params.id) return next(new Error('No article Id'));
  req.collections.articles.updateById(req.params.id, {$set: req.body.article}, function(error, count){
    if(error) return next(error);
    res.send({ affectedCount : count });
  });
};

// delete article api

exports.del = function(req, res, next){
  if(!req.params.id) return next(new Error('No article id'));
  req.collections.articles.removeById(req.params.id, function(error, count){
    if(error) return next(error);
    res.send({ affectedCount : count });
  });
};

// get Article post page

exports.post = function(req, res, next){
  if(!req.body.title)
  res.render('post');
};

//post article post page

exports.postArticle = function(req, res, next){
  if(!req.body.title || !req.body.slug || !req.body.text){
    return res.render('post', {error : 'Fill title, slug and text.'});
  }
  var article = {
    title : req.body.title,
    slug : req.dody.slug,
    text : req.body.text,
    published : false
  };

  req.collections.articles.insert(article, function(error, articleResponse){
    if (error) return next(error);
    res.render('post', { error : 'Article was added. Publish it on Admin page.'});
  });
};

//get Admin page
exports.admin = function(req, res, next){
  req.collections.articles.find({}, {sort : {_id : -1}}).toArray(function(error, articles){
    if (error) return next(error);
    res.render('admin', {articles : articles});
  });
};



