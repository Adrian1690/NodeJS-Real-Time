var mongoskin = require('mongoskin');
  dbHost = '127.0.0.1',
  dbPort = '27017';

var db =  mongoskin.db(dbHost + ':' + dbPort + '/local',{safe:true});
var collectionMessages = db.collection('messages');

db.bind('messages',{
  findOneAndAddText : function(text,fn){
    collectionMessages.findOne({},function(error,item){
      if(error){
        console.error(error);
    	process.exit(1);
      }
      console.info("find One :", item);
      item.text = text;
      var id = item._id.toString(); // stored id as string
      console.info("before saving: ", item);
    
      collectionMessages.save(item, function(error,count){
        console.info("save : ", count);
        return fn(count,id);
      });
    })
  }
});

collectionMessages.findOneAndAddText('we are brothers', function(count,id){
  collectionMessages.find({_id: collectionMessages.id(id)
  }).toArray(function(error,items){
    console.info('find :',items);
    db.close();
    process.exit(0); 
  })
});

