import getCollection, { LINKS_COLLECTION } from "./db";

export default async function createNewLink(url: string, alias: string) {
  const collection = await getCollection(LINKS_COLLECTION);

  const existing = await collection.findOne({ alias });
  if (existing) {
    throw new Error("Alias already taken");
  }

  // Validate URL format
  function isValidHttpUrl(string: string) {
    try {
      const url = new URL(string);
      return url.protocol === "http:" || url.protocol === "https:";
    } catch (_) {
      return false;
    }
  }
  
  if (!isValidHttpUrl(url)) {
    throw new Error("Invalid URL format. Must start with http:// or https://");
  }
  

  const result = await collection.insertOne({ url, alias });
  return result.insertedId;
}