// const mongoose = require("mongoose");

// const connectDB = async () => {
//   console.log(process.env.DB_CONNECTION_SECRET);
//   await mongoose.connect(process.env.DB_CONNECTION_SECRET);
// };

// module.exports = connectDB;
const { MongoClient } = require("mongodb");

const URI =
  "mongodb+srv://sarmajahnabi8_db_user:avc41S4gy3SwAye8@jahnabiscluster.rluv5ex.mongodb.net/?appName=JahnabisCluster";

const client = new MongoClient(URI);
const dbName = "HelloWorld";

async function main() {
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  const collection = db.collection("User");

  // insert / create
  const data = {
    firstname: "Manash",
    lastname: "Sarma",
    city: "DownTown",
    phoneNumber: "9823347487",
  };
  const insertResult = await collection.insertOne(data);
  console.log("Inserted documents =>", insertResult);

  // Read
  const findResult = await collection.find({}).toArray();
  console.log("Found documents =>", findResult);

  const countResult = await collection.countDocuments({});
  console.log("Count of documents in the user collection =>", countResult);

  // Update
  const filter = { firstname: "Manash" };
  const updateDoc = { $set: { city: "New York" } };
  const updateResult = await collection.updateOne(filter, updateDoc);
  console.log("Updated this one - ", updateResult);

  // Update many users at once
  const filterMany = { firstname: "Basanta" };
  const updateManyDoc = { $set: { city: "Silicon Valley" } };
  const updateManyResult = await collection.updateMany(
    filterMany,
    updateManyDoc,
  );
  console.log("Updated these - ", updateManyResult);

  //deleteOne
  const deleteOneDoc = await collection.deleteOne({ firstname: "Jahnabi" });
  console.log("Deleted one document =>", deleteOneDoc);

  //deleteMany
  const deleteManyDocs = await collection.deleteMany({
    city: "Silicon Valley",
  });
  console.log("Deleted many documents =>", deleteManyDocs);

  // find all documents with a filter of firstname = Basanta

  const result = await collection.find({ firstname: "Basanta" }).toArray();
  const count = await collection.countDocuments({ firstname: "Basanta" }); // {} means all
  console.log("Result and its count =>", result, count);

  return "done.";
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
