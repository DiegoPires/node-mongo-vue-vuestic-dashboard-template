use sales;

db.createCollection('sales')
db.sales.createIndex({"timeStamp":1, "type":1})
db.sales.createIndex({"type":1})

db.createView("types", "sales", [ { $group: { _id: "$type" } } , { $project: { type : "$_id", _id: 0 }  }, { $sort: { type: 1 } } ]);

db.createUser({ user: "dashboard", pwd: "whatever1", roles: [ { role: "readWrite", db: "sales" } ]  } )