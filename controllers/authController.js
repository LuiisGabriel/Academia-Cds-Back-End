import AuthService from "../services/authService.js";

class AuthController {
  constructor() {
    this.authService = new AuthService();
  }

  async signup(req, res) {
    try {
      const { email, password, firstname, lastname, role } = req.body;
      if (!email || !password || !firstname || !lastname || !role) {
        res.status(400).end();
        return;
      }
      const { user, token } = await this.authService.signup({
        email,
        password,
        firstname,
        lastname,
        role,
      });

      res.send({ user, token });
    } catch (err) {
      console.error("POST auth/signup, Something Went Wrong:", err);
      res.status(400).send({ error: true, message: err.message });
    }
  }

  async signin(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(400).end();
        return;
      }
      const token = await this.authService.signin(email, password);
      const user = await this.authService.getCurrentUser(token);
      res.status(200).json({ token, user });
    } catch (err) {
      console.error("POST auth/signin, Something Went Wrong:", err);
      res.status(400).send({ error: true, message: err.message });
    }
  }

  async getCurrentUser(req, res) {
    const defaultReturnObject = { authenticated: false, user: null };
    try {
      const token = String(req.headers.authorization?.replace("Bearer ", ""));
      const user = await this.authService.getCurrentUser(token);
      res.status(200).json({ authenticated: true, user });
    } catch (err) {
      console.error("GET auth/me, Something Went Wrong:", err);
      res.status(400).json(defaultReturnObject);
    }
  }


  async createVideo(req, res) {
    try {
      const { titulo, ambiente, modulo, url, subModulo } = req.body;
      if (!titulo || !ambiente || !modulo || !url || !subModulo) {
        res.status(400).end();
        return;
      }
      const { user, token } = await this.authService.createVideo({
        titulo,
        ambiente,
        modulo,
        url,
        subModulo,
      });
      res.send({ user, token });
    } catch (err) {
      console.error("POST auth/createVideo, Something Went Wrong:", err);
      res.status(400).send({ error: true, message: err.message });
    }
  }

}

export default AuthController;