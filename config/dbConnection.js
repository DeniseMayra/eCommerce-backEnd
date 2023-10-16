import mongoose from 'mongoose';

export const mongoUrl = 'mongodb+srv://lade:AAPxiDVBiZRr5F2s@mycluster.xnib3fr.mongodb.net/ecommerce?retryWrites=true&w=majority';

export const connectDB = async() => {
  try {
    await mongoose.connect(mongoUrl);
    console.log('DB conectado correctamente');
  } catch (error) {
    console.log(`Error al conectar a DB: ${error.message}`);
  }
};
