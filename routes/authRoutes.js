import express from 'express';
 import cors from 'cors';
 import AuthController from '../controllers/authController.js';
 
 const router = express.Router();
 const authController = new AuthController();
 
 
 router.post('/auth/signUp', (req, res) => authController.signup(req, res));
 router.post('/auth/signIn', (req, res) => authController.signin(req, res));
 router.get('/auth/me', (req, res) => authController.getCurrentUser(req, res));
 router.post('/auth/createVideo', (req, res) => authController.createVideo(req, res));

export default router;
