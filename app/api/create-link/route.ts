import { NextResponse } from "next/server";
import createNewLink from "@/lib/createNewLink";

export async function POST(req: Request) {
  try {
    const { url, alias } = await req.json();
    await createNewLink(url, alias);
    return NextResponse.json({ message: "Created successfully" }, { status: 201 });
  } catch (err) {
    const error = err instanceof Error ? err : new Error("Unknown error");
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}