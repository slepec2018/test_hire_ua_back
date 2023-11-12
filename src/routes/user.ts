import { Router } from 'express';
import {
  create
} from '../controllers/user';
import { userValidation, validate } from '../middlewares/validator';

const router = Router();

router.post('/create', userValidation, validate, create);


export default router;