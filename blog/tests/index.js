var boot = require('../app').boot,
  shutdown = require('../app').shutdown,
  port = require('../app').port,
  superagent = require('superagent'),
  expect = require('expect.js');

describe('server',function(){
  before(function(){
    boot();	
  });


  describe('homepage',function(){
    it('should respond to get',function(done){
      superagent
        .get('http://localhost:'+port)
        .end(function(res){
          expect(res.status).to.equal(200);
   	  done() 
        })	
    })
  });
  after(function(){
    shutdown();
  });
});
