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
    try {
      const MONGODB_URI = process.env.MONGODB_URI;
      if (!MONGODB_URI) {
        throw new Error(
          'Por favor define la variable MONGODB_URI en el archivo .env.local'
        );
      }

      await mongoose.connect(MONGODB_URI, {
        bufferCommands: false,
      });

      console.log('Conexión a MongoDB establecida correctamente.');
    } catch (error) {
      console.error('Error al conectar a MongoDB:', error);
      throw error; // Propaga el error para manejarlo donde se llama a `connect()`
    }
  }
}

export default MongoConnection.getInstance();
