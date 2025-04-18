import { NextResponse } from "next/server";
import createNewLink from "@/lib/createNewLink";

export async function POST(req: Request) {
  try {
    const { url, alias } = await req.json();
    await createNewLink(url, alias);
    return NextResponse.json({ message: "Created successfully" }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}