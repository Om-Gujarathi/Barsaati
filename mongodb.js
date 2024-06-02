import { MongoClient, ServerApiVersion } from "mongodb";
import { mongo_url } from "./constants.js";

const client = new MongoClient(mongo_url, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
await client.connect();

export async function uploadData(data) {
  try {
    const db = client.db("TwitterData");
    const collection = db.collection("Trends");

    const result = await collection.insertMany(data);
    console.log(
      `${result.insertedCount} document was inserted into the database.`
    );
  } catch (error) {
    console.error("Error uploading data: ", error);
  } finally {
    await client.close();
  }
}

const data = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
];

uploadData(data)
  .then(() => console.log("Data upload complete"))
  .catch(console.error);
