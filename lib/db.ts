import { MongoClient, Db, Collection } from "mongodb";

const MONGODB_URI = process.env.MONGO_URI as string;
const DB_NAME = "CS391-mp5";
export const LINKS_COLLECTION = "links";

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI environment variable is missing");
}

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

async function connect(): Promise<Db> {
  if (cachedDb) return cachedDb;

  const client = new MongoClient(MONGODB_URI);
  await client.connect();

  const db = client.db(DB_NAME);
  cachedClient = client;
  cachedDb = db;

  return db;
}

export default async function getCollection(collectionName: string): Promise<Collection> {
  const db = await connect();
  return db.collection(collectionName);
}
