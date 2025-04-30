import express from 'express';
import AuthController from '../controllers/authController.js';

const router = express.Router();
const authController = new AuthController();

router.post('/auth/signup', (req, res) => authController.signup(req, res));
router.post('/auth/signin', (req, res) => authController.signin(req, res));
router.get('/auth/me', (req, res) => authController.getCurrentUser(req, res));
router.post('/auth/createVideo', (req, res) => authController.createVideo(req, res));
router.post('/auth/createQuestion', (req, res) => authController.createQuestion(req, res));
router.get('/auth/getVideos', (req, res) => authController.getVideos(req, res));
router.get('/auth/getQuestions', (req,res) => authController.getQuestions(req,res));
router.post('/auth/updateUserWatchedVideos', (req, res) => authController.updateUserWatchedVideos(req, res));

export default router;