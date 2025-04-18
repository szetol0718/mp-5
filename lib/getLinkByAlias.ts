import getCollection, { LINKS_COLLECTION } from "./db";

export default async function getLinkByAlias(alias: string) {
  const collection = await getCollection(LINKS_COLLECTION);
  return await collection.findOne({ alias });
}