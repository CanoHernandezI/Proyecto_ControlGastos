import { Router } from 'express';
import { sendMessage } from '../controllers/dialogflowController';

const router = Router();

router.post('/dialogflow', sendMessage);

export default router;
