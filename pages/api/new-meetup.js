import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      "mongodb+srv://amel123:123@cluster0.cnozerd.mongodb.net/?retryWrites=true&w=majority"
    );

    const database = client.db();

    const meetupsCollection = database.collection("meetups");
    const result = await meetupsCollection.insertOne( data );

    client.close();
    res.status(201).json({ message: "Meetup inserted!" });
  }
}

export default handler;
