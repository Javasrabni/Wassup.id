import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGO_URI as string;

if (!MONGODB_URI) {
  throw new Error("❌ MONGO_URI belum di set di .env.local");
}

let isConnected= false;

export async function connectDB() {
  if (isConnected) return;

  const db = await mongoose.connect(MONGODB_URI);
  isConnected = db.connections[0].readyState === 1;

  console.log("✅ MongoDB Connected");
}
