import { Router } from 'express';

export default (app) => {
    const router = Router();
    router.post('/signup',);

    router.post('/signin',);

    app.use('/api/auth', router);
}