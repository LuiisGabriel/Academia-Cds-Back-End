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

  async getNextUsers(req, res) {
    try {
      const nextUsers = await this.authService.getNextUsers();
      res.status(200).json({ nextUsers });
    } catch (err) {
      console.error("GET auth/getNextUsers, Something Went Wrong:", err);
      res.status(400).send({ error: true, message: err.message });
    }
  }

  async getAmbientes(req, res) {
    try {
      const ambientes = await this.authService.getAmbientes();
      res.status(200).json({ ambientes });
    } catch (err) {
      console.error("GET auth/getAmbientes, Something Went Wrong:", err);
      res.status(400).send({ error: true, message: err.message });
    }
  }

  async getModulos(req, res) {
    try {
      const modulos = await this.authService.getModulos();
      res.status(200).json({ modulos });
    } catch (err) {
      console.error("GET auth/getModulos, Something Went Wrong:", err);
      res.status(400).send({ error: true, message: err.message });
    }
  }

  async getSubModulos(req, res) {
    try {
      const subModulos = await this.authService.getSubModulos();
      res.status(200).json({ subModulos });
    } catch (err) {
      console.error("GET auth/getSubModulos, Something Went Wrong:", err);
      res.status(400).send({ error: true, message: err.message });
    }
  }

  async getTreinamentos(req, res) {
    try {
      const treinamentos = await this.authService.getTreinamentos();
      res.status(200).json({ treinamentos });
    } catch (err) {
      console.error("GET auth/getTreinamentos, Something Went Wrong:", err);
      res.status(400).send({ error: true, message: err.message });
    }
  }

  async getAvaliacoes(req, res) {
    try {
      const avaliacoes = await this.authService.getAvaliacoes();
      res.status(200).json({ avaliacoes });
    } catch (err) {
      console.error("GET auth/getAvaliacoes, Something Went Wrong:", err);
      res.status(400).send({ error: true, message: err.message });
    }
  }

  async createTreinamento(req, res) {
    try {
      const { titulo, descricao, ambiente, modulo, subModulo, videos } = req.body;
      if (!titulo || !descricao || !ambiente || !modulo || !subModulo || !videos) {
        res.status(400).end();
        return;
      }
      const { user, token } = await this.authService.createTreinamento({
        titulo,
        descricao,
        ambiente,
        modulo,
        subModulo,
        videos,
      });
      res.send({ user, token });
    } catch (err) {
      console.error("POST auth/createTreinamento, Something Went Wrong:", err);
      res.status(400).send({ error: true, message: err.message });
    }
  }

  async createAvaliacao(req, res) {
    try {
      const { titulo, descricao, ambiente, modulo, subModulo, valuationQuestions } = req.body;
      if (!titulo || !descricao || !ambiente || !modulo || !subModulo || !valuationQuestions) {
        res.status(400).end();
        return;
      }
      const { user, token } = await this.authService.createAvaliacao({
        titulo,
        descricao,
        ambiente,
        modulo,
        subModulo,
        valuationQuestions
      });
      res.send({ user, token });
    } catch (err) {
      console.error("POST auth/createAvaliacao, Something Went Wrong:", err);
      res.status(400).send({ error: true, message: err.message });
    }
  }

  async updateUserWatchedVideos(req, res) {
    try {
      const { email, watchedVideos } = req.body;
      if (!email || !watchedVideos) {
        res.status(400).end();
        return;
      }
      const { updatedUserWatchedVideos } = await this.authService.updateUserWatchedVideos({
        email,
        watchedVideos,
      });
      res.send({ updatedUserWatchedVideos });
    } catch (err) {
      console.error("POST auth/updateUserWatchedVideos, Something Went Wrong:", err);
      res.status(400).send({ error: true, message: err.message });
    }
  }

  async updateUserAnsweredValuations(req, res) {
    try {
      const { email, answeredValuations } = req.body;
      if (!email || !answeredValuations) {
        res.status(400).end();
        return;
      }
      const { updatedUserAnsweredValuations } = await this.authService.updateUserAnsweredValuations({
        email,
        answeredValuations,
      });
      res.send({ updatedUserAnsweredValuations });
    } catch (err) {
      console.error("POST auth/updateUserAnsweredValuations, Something Went Wrong:", err);
      res.status(400).send({ error: true, message: err.message });
    }
  }

  async publishValuation(req, res) {
    try {
      const { titulo } = req.body;
      if (!titulo) {
        res.status(400).end();
        return;
      }
      const { publishedValuation } = await this.authService.publishValuation({
        titulo,
      });
      res.send({ publishedValuation });
    } catch (err) {
      console.error("POST auth/publishValuation, Something Went Wrong:", err);
      res.status(400).send({ error: true, message: err.message });
    }
  }

  async publishTrainment(req, res) {
    try {
      const { titulo } = req.body;
      if (!titulo) {
        res.status(400).end();
        return;
      }
      const { publishedTrainment } = await this.authService.publishTrainment({
        titulo,
      });
      res.send({ publishedTrainment });
    } catch (err) {
      console.error("POST auth/publishTrainment, Something Went Wrong:", err);
      res.status(400).send({ error: true, message: err.message });
    }
  }

    async unpublishTrainment(req, res) {
    try {
      const { titulo } = req.body;
      if (!titulo) {
        res.status(400).end();
        return;
      }
      const { unpublishedTrainment } = await this.authService.unpublishTrainment({
        titulo,
      });
      res.send({ unpublishedTrainment });
    } catch (err) {
      console.error("POST auth/unpublishTrainment, Something Went Wrong:", err);
      res.status(400).send({ error: true, message: err.message });
    }
  }

      async deleteTrainment(req, res) {
    try {
      const { titulo } = req.body;
      if (!titulo) {
        res.status(400).end();
        return;
      }
      const { deletedTrainment } = await this.authService.deleteTrainment({
        titulo,
      });
      res.send({ deletedTrainment });
    } catch (err) {
      console.error("POST auth/deleteTrainment, Something Went Wrong:", err);
      res.status(400).send({ error: true, message: err.message });
    }
  }

}

export default AuthController;