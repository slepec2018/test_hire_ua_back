import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import useRouter from './routes/user';
import { errorHandler } from './middlewares/error';
require("dotenv").config();
require('./db');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/user', useRouter);

app.use(errorHandler);

app.listen(8000, () => console.log('Server started! The port is listening on port 8000'));