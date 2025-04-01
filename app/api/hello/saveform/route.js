import { connectDB } from "@/lib/mongodb";
import FormData from "@/models/FormData";

export async function POST(req) {
  try {
    await connectDB();
    const { name, email, message } = await req.json();
    const newEntry = new FormData({ name, email, message });
    await newEntry.save();
    
    return new Response(JSON.stringify({ success: true, data: newEntry }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
