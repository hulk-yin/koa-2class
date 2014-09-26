var koa = require("koa");
var co = require("co");
var thunkify = require("thunkify");
var q = require("q");

var a = thunkify(function  (i,next) {
	//console.log("a",this)
	setTimeout(function (){
		console.log("a1");
		 next(null,"a2");
	},i)
})
var c = function(){
	//console.log("c",this)
	var def = new q.defer();
	setTimeout(function(){
		console.log("c1");
		def.resolve("c2");
	},1000)
	// c.next = then;
	return def.promise;
}
var d = function *(){
	console.log("d",this)
	return "d";
}
var b = function *(next){
	console.log("b",this)
	yield a(1000);;
	console.log("b1");
	console.log(next)
	//var d= yield c()
	//var  d= yield co(c());
	//var d = yield c()
	console.log("b2")
	console.log(yield f)
	return "b3"
}
var f= function*(){
	console.log("f",this)
	return "f"
}
var e= function*(){
	console.log("e1")
	console.log("e",this)
	console.log(yield co(b.call("T2","e2")));

	console.log(yield c());

	console.log(yield d);
	// co(b.call(this,"e2"))();
	console.log("e3")	
}
//c().then(function(d){console.log(d)})
co(e).call("T1")
