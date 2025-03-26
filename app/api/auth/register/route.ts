import { hash } from "bcrypt";
import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();
    // console.log({ email, password });

    const hashedpassword = await hash(password, 10);

    const sql = neon(`${process.env.DATABASE_URL}`);
    const response =
      await sql`INSERT INTO USERS(name, email, password) VALUES (${name}, ${email}, ${hashedpassword})`;

    console.log(response);
    return response;
  } catch (e) {
    console.log(e);
  }

  return NextResponse.json({ message: "success" });
}
