import mongoose from 'mongoose';

const url = 'mongodb+srv://lade:AAPxiDVBiZRr5F2s@mycluster.xnib3fr.mongodb.net/ecommerce?retryWrites=true&w=majority';

export const connectDB = async() => {
  try {
    await mongoose.connect(url);
    console.log('DB conectado correctamente');
  } catch (error) {
    console.log(`Error al conectar a DB: ${error.message}`);
  }
};
