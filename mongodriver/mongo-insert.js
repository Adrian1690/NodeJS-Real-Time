var mongo = require('mongodb'),
  dbHost = '127.0.0.1',
  dbPort = 27017;

var Db = mongo.Db;
var Connection = mongo.Connection;
var Server = mongo.Server;
var db = new Db ('local', new Server(dbHost, dbPort), {safe:true});

db.open(function(error, dbConnection){
  if(error){
    console.error(error);
    process.exit(1);
  }
  console.log('Db state: ',db._state);
  item = {
   name : 'Juan Penia' 
  }
  var collection = dbConnection.collection('messages');  
  collection.insert(item, function(error,item){
    if (error){
      console.error(error);
      process.exit(1); 
    }
    console.info('Created / inserted: ',item);
    db.close();
    process.exit(0);		
  }); 
});
