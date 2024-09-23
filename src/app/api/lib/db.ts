// lib/db.ts
import mongoose from 'mongoose';

class MongoConnection {
  private static instance: MongoConnection;
  private constructor() {
    // Previene el uso del constructor
  }

  public static getInstance(): MongoConnection {
    if (!MongoConnection.instance) {
      MongoConnection.instance = new MongoConnection();
    }
    return MongoConnection.instance;
  }

  public async connect() {
    if (mongoose.connection.readyState >= 1) {
      return;
    }

    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/nextjs_auth';
    if (!MONGODB_URI) {
      throw new Error('Por favor define la variable MONGODB_URI en el archivo .env.local');
    }

    return mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }
}

export default MongoConnection.getInstance();
