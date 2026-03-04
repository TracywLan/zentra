import dbConnect from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    await dbConnect();
    const { name, email, password } = await req.json();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ error: "User already exists" }), { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return new Response(JSON.stringify(user), { status: 201 });
  } catch (error) {
    // THIS IS THE CRUCIAL ADDITION
    console.error("=== REGISTRATION CRASH DETAILS ===");
    console.error(error);
    console.error("==================================");
    
    return new Response(JSON.stringify({ error: "Something went wrong" }), { status: 500 });
  }
}