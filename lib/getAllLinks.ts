import getCollection, { LINKS_COLLECTION } from "./db";

export default async function getAllLinks() {
  const collection = await getCollection(LINKS_COLLECTION);
  return await collection.find().sort({ _id: -1 }).toArray();
}
