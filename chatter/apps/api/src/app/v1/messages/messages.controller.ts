import { Router } from 'express';

const router = Router();

router.get('/', (req, res, next) => {
  res.send('<h1>Hello world. I am Express!</h1>');
});

export { router };
