import { getCurrentUser } from '../../controllers/authController';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      await getCurrentUser(req, res);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
