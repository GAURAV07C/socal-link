import mongoose from 'mongoose';

let isConnected = false;

export const connectToDB = async () => {
  if (isConnected) {
    console.log("Already connected to MongoDB");
    return;
  }

  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI as string);

    isConnected = connection.connection.readyState === 1;
    console.log("Successfully connected to MongoDB");

  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

// Call the connectToDB function
connectToDB();
