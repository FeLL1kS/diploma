import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import SequelizeInstance from './src/config/SequelizeInstance';

dotenv.config();
const PORT: string = process.env.APP_PORT || '5000';
const app: express.Application = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, './')));

app.options('*', cors);

const start = async () => {
  try {
    await SequelizeInstance.checkConnection();

    app.listen(PORT, () => {
      console.log('Server running on port %d', PORT);
    });
  } catch (error) {
    console.error(error);
  }
};

start();
