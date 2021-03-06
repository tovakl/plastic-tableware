
// get mongo-module
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
// Connection URL
var url = 'mongodb://localhost:27017/TestDB';
var DB;
 
// Use connect method to connect to the server
MongoClient.connect(url, function (err, db) {
    assert.equal(null, err);   
    console.log("Connected correctly to database server");
    DB = db;
    test(db);
    db.close();
});

var test = function (db) {
    db.collection('stock').remove();
    /*db.collection('stock').find().toArray(
        function (err, docs) {
            console.log("first operation:");
            console.log(docs);
        })
    
    addItem(item1);
    db.collection('stock').find().toArray(function (err, docs) {
        console.log("second operation:");
        console.log(docs);
    });
	
	addItem(item3);
    db.collection('stock').find().toArray(function (err, docs) {
        console.log("second operation:");
        console.log(docs);
    });*/
	
    addItem(item2);
    db.collection('stock').find().toArray(function (err, docs) {
        console.log("1 operation:");
        console.log(docs[0].colors);
    });
	
	reduceQuantity("2","red",3);
	db.collection('stock').find().toArray(function (err, docs) {
        console.log("2 operation:");
        console.log(docs[0].colors);
    });
	
	/*removeItem(item1);
    db.collection('stock').find().toArray(function (err, docs) {
        console.log("forth operation:");
        console.log(docs);
    });*/
	
	//getItemsByCategory("plates");
	
	//getItemsBySubCategory("circle");
	
	//getItemByIndex("3");
	
	/*addItemAPI("plates","circle","4","item4","this is item 1","third shelf");
	db.collection('stock').find().toArray(function (err, docs) {
        console.log("fifth operation:");
        console.log(docs);
    });*/
	
	//getAllItems();
	
	/*changeItemNisayon({"index":"3"},{"index":"1"});
	db.collection('stock').find().toArray(function (err, docs) {
        console.log("sixth operation:");
        console.log(docs);
	});*/
	
	/*changeItem();
	db.collection('stock').find().toArray(function (err, docs) {
        console.log("sevnth operation:");
        console.log(docs);
	});*/
	
	/*changeItems();
	db.collection('stock').find().toArray(function (err, docs) {
        console.log("eighth operation:");
        console.log(docs);
	});*/
	
};
var Color = function () {
    var name, image, quantity, minQuantity;
    return {
        "name": name,
        "image": image,
        "quantity": quantity,
        "minQuantity": minQuantity
    };
};
var Item = function () {
    var category, subCategory;
    var index, name, description, location;
    var colors = [];
    var toString = function () {
        return JSON.stringify(this);
    };
};

var item1 = {
    category: "plates",
    subCategory: "circle",
    index: "1",
    name: "item1",
    description: "this is item 1",
    location: "third shelf",
    colors: [
        { name: "red", quantity: 50, minQuantity: 5 },
        { name: "blue", quantity: 60, minQuantity: 5 },
        { name: "green", quantity: 100, minQuantity: 5 },
    ]
};
 
var item2 = {
    category: "plates",
    subCategory: "square",
    index: "2",
    name: "item2",
    description: "this is item 2",
    location: "second shelf",
    colors: [
        { name: "red", quantity: 50, minQuantity: 5 },
        { name: "blue", quantity: 60, minQuantity: 5 },
        { name: "green", quantity: 100, minQuantity: 5 },
    ]
};

var item3 = {
    category: "cups",
    subCategory: "tall",
    index: "3",
    name: "item3",
    description: "this is item 3",
    location: "second shelf",
    colors: [
        { name: "red", quantity: 50, minQuantity: 5 },
        { name: "blue", quantity: 60, minQuantity: 5 },
        { name: "green", quantity: 100, minQuantity: 5 },
    ]
	//colors = {name:["red","blue","green"],quantity:[50,60,100],minQuantity:[5,5,5]}
};

//Data-Base structure
var insertDocuments = function (db, callback) {
    // Get the documents collection
    var collection = db.collection('test');
    // Insert some documents
    collection.insertMany([item1,item2,item3],
     function (err, result) {
        //assert.equal(err, null);
        //assert.equal(3, result.result.n);
        //assert.equal(3, result.ops.length);
        console.log("Inserted " +result.result.n+" documents into the collection");
        callback(result);
    });
}

var findDocuments = function (db, callback) {
    // Get the documents collection
    var collection = db.collection('stock');
   
    // Find some documents
    
    collection.find({}).toArray(function (err, docs) {
        //assert.equal(err, null);
        console.log("Found the following records:");
        console.log(docs);
        //callback(result);
    });
}

var updateDocument = function (db, callback) {
    // Get the documents collection
    var collection = db.collection('documents');
    // Update document where a is 2, set b equal to 1
    collection.updateOne({ a: 2 }
      , { $set: { b: 1 } }, function (err, result) {
          assert.equal(err, null);
          assert.equal(1, result.result.n);
          console.log("Updated the document with the field a equal to 2");
          callback(result);
      });
}

var removeDocument = function (db, callback) {
    // Get the documents collection
    var collection = db.collection('documents');
    // Insert some documents
    collection.deleteMany({ }, function (err, result) {
        console.log("Removed all document with the field a equal to 3");
        callback(result);
    });
}

var indexCollection = function (db, callback) {
    db.collection('documents').createIndex(
      { "a": 1 },
        null,
        function (err, results) {
            console.log(results);
            callback();
        }
    );
};

//API's getItems
var getItemsByCategory = function(category){ //work
	getItem({"category":category});
};
var getItemsBySubCategory = function(subCategory){ //work
	getItem({"subCategory":subCategory});
};
var getItemByIndex = function(index){ //work
	getItem({"index":index});
};
var getAllItems = function(){ //work
	while (!DB.open);
	getItem({});
};

//Internal function getItem
var getItem = function (query) { //work
    var collection = DB.collection('stock');
    // Find item
    collection.find(query).toArray(function (err, docs) {
        console.log("Found the following items:");
        console.log(docs);
        
    });	
};

//API addItem
var addItemAPI = function(category,subCategory,index,item,description,location){ //work 
//לא שיניתי את מערך הצבעים כי אני לא יודעת איך לגשת איך לגשת אליהם
	console.log("bhgdgg");
	var item4 = {
    category: category,
    subCategory: subCategory,
    index: index,
    name: item,
    description: description,
    location: location,
    colors: [
        { name: "red", quantity: 50, minQuantity: 5 },
        { name: "blue", quantity: 60, minQuantity: 5 },
        { name: "green", quantity: 100, minQuantity: 5 },
    ]
	};
	addItem(item4);
};
//Internal function addItem
var addItem = function (item) { //work
    var collection = DB.collection('stock');
    collection.insert(item);
};
//Internal function & API removeItem
var removeItem = function (item){ //work
	var collection = DB.collection('stock');
    collection.remove(item);
};

/*reduceQuantity = function(index,num){
	var collection = DB.collection('stock');
	collection.find({"index":index}).toArray();
//צריך חלץ את הכמות ואני לא יודעת איך	
	var newQuantity = ;
	newQuantity +=num;
	changeItemNisayon({"quantity":""},{"quantity":newQuantity});
};*/

var reduceQuantity = function(index,color,num){
	var collection = DB.collection('stock');
	var item = collection.find({"index":index,"colors.name":color},{colors:true});
	var newQuantity = item.quantity-num;
	changeItemNisayon({"index":index,"colors.name":color},{"colors.quantity":newQuantity});
};

var changeItemNisayon = function (query1,query2){  //work!!!!!!!! I don't believe!!!!!!!!!
	var collection = DB.collection('stock');
	collection.update(query1, {$set:query2});
};

var raiseQuantity = function(item,num){
	
};
var changeItems = function (){ //work 
	var collection = DB.collection('stock');
	collection.update({"category":"plates"}, {$set:{"category":"df"}},{multi: true});//, function(err,docs) {
};
var changeItem = function (){  //work
	var collection = DB.collection('stock');
	collection.update({"category":"cups"}, {$set:{"category":"as"}});
};

module.exports = { item1, item2, item3, getItem, addItem, Item, Color, getAllItems ,changeItem ,changeItems,changeItemNisayon ,raiseQuantity ,getItemsByCategory,getItemsBySubCategory,getItemByIndex,getAllItems,addItemAPI,removeItem};