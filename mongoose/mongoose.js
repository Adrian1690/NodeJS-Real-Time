var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var Book = mongoose.model('Book', { name: String });

var practicalNodeBook = new Book({ name: 'Practical Node.js with Adrian' });
practicalNodeBook.save(function (err, results){
  if(err){
    console.log(err);
    process.exit(1);	
  }else{
    console.log('saved : ', results);
    process.exit(0);
  }
});


