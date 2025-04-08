import express from 'express';
import AuthController from '../controllers/authController.js';

const router = express.Router();
const authController = new AuthController();

router.options('*', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.set('Access-Control-Allow-Credentials', 'true');
  res.sendStatus(204); 
});

router.post('/auth/signup', (req, res) => authController.signup(req, res));
router.post('/auth/signin', (req, res) => authController.signin(req, res));
router.get('/auth/me', (req, res) => authController.getCurrentUser(req, res));
router.post('/auth/createVideo', (req, res) => authController.createVideo(req, res));

export default router;
