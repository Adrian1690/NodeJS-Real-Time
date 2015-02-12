var mongo = require('mongodb'),
  dbHost = '127.0.0.1',
  dbPort = 27017;

var Db = mongo.Db;
var Connection = mongo.Connection;
var Server = mongo.Server;
var db = new Db ('local', new Server(dbHost, dbPort), {safe:true});

db.open(function(error,dbConnection){
  if(error){
    console.log(error);
    process.exit(1);
  }
  console.log('db state: ',db._state);
  
  dbConnection.collection('messages').findOne({},function(error,item){
    if(error){
      console.error(error);
      process.exit(1);
    }
    console.info('find One' , item);
    item.text = 'Hi Adrian';
    var id = item._id.toString(); // get id item find
    
    console.log('before saving : ', item);
    dbConnection.collection('messages').save(item,function(){ //save is update
      console.info('save :', item);
      dbConnection.collection('messages').find({_id : new mongo.ObjectID(id)}).toArray(function(error, items){
         console.info('find : ', items);
	 process.exit(0);
      });
    });
   });
});
