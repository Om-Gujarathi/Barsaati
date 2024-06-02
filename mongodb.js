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

    await collection.insertOne(data);
    console.log(`Document was inserted into the database.`);
  } catch (error) {
    console.error("Error uploading data: ", error);
  } finally {
    await client.close();
  }
}
