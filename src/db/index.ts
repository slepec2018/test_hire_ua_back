import mongoose from 'mongoose';

const mongodbUri: string = process.env.MONGO_URI as string;

mongoose
  .connect(mongodbUri)
  .then(() => {
    console.log('Connected to database!');
  })
  .catch(err => { 
    console.log('Databade is failed:', err);
  });