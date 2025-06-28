import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://Dr_tech_Task:FTss9bkAO4y7y9cs@cluster0.l4anbhy.mongodb.net"
    );
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("DB Error:", error);
    process.exit(1);
  }
};
