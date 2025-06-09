import express from 'express';
import AuthController from '../controllers/authController.js';

const router = express.Router();
const authController = new AuthController();


router.get('/auth/me', (req, res) => authController.getCurrentUser(req, res));
router.get('/auth/getNextUsers', (req, res) => authController.getNextUsers(req, res));
router.get('/auth/getTrainmentVideos', (req, res) => authController.getTrainmentVideos(req, res));
router.get('/auth/getVideos', (req, res) => authController.getVideos(req, res));
router.get('/auth/getAmbientes', (req, res) => authController.getAmbientes(req, res));
router.get('/auth/getModulos', (req, res) => authController.getModulos(req, res));
router.get('/auth/getSubModulos', (req, res) => authController.getSubModulos(req, res));
router.get('/auth/getTreinamentos', (req, res) => authController.getTreinamentos(req, res));
router.get('/auth/getAvaliacoes', (req, res) => authController.getAvaliacoes(req, res));
router.post('/auth/signup', (req, res) => authController.signup(req, res));
router.post('/auth/signin', (req, res) => authController.signin(req, res));
router.post('/auth/createTreinamento', (req, res) => authController.createTreinamento(req, res));
router.post('/auth/createAvaliacao', (req, res) => authController.createAvaliacao(req, res));
router.post('/auth/updateUserWatchedVideos', (req, res) => authController.updateUserWatchedVideos(req, res));
router.post('/auth/updateUserAnsweredValuations', (req, res) => authController.updateUserAnsweredValuations(req, res));
router.post('/auth/updateTrainmentVideos', (req, res) => authController.updateTrainmentVideos(req, res));
router.post('/auth/updateValuationQuestions', (req, res) => authController.updateValuationQuestions(req, res));
router.post('/auth/updateNextUser', (req, res) => authController.updateNextUser(req, res));
router.post('/auth/redefinePassword', (req, res) => authController.redefinePassword(req, res));
router.post('/auth/publishValuation', (req, res) => authController.publishValuation(req, res));
router.post('/auth/unpublishValuation', (req, res) => authController.unpublishValuation(req, res));
router.post('/auth/deleteValuation', (req, res) => authController.deleteValuation(req, res));
router.post('/auth/publishTrainment', (req, res) => authController.publishTrainment(req, res));
router.post('/auth/unpublishTrainment', (req, res) => authController.unpublishTrainment(req, res));
router.post('/auth/deleteTrainment', (req, res) => authController.deleteTrainment(req, res));
router.post('/auth/deleteNextUser', (req, res) => authController.deleteNextUser(req, res));

export default router;