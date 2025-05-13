import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import gqlClient from "../graphql/client.js";
import { CreateNextUserMutation, GetUserByEmailQuery, CreateVideoMutation, GetVideosQuery, GetQuestionsQuery, updateUserWatchedVideosMutation, CreateQuestionMutation, GetAmbientesQuery, GetModulosQuery, GetSubModulosQuery, GetTreinamentosQuery, CreateTreinamentoMutation, GetAvaliacoesQuery, CreateAvaliacaoMutation, updateUserAnsweredValuationsMutation } from "../graphql/mutations.js";

const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;

class AuthService {
  async signup(signupRequest) {
    const { email, password, firstname, lastname, role } = signupRequest;
    const getUserResponse = await gqlClient.request(GetUserByEmailQuery, {
      email,
    });
    if (getUserResponse?.nextUser?.email === email) {
      throw new Error("Este email já está sendo utilizado");
    }
    const hashedPassword = await bcrypt.hash(password, 8);
    const userData = {
      email,
      password: hashedPassword,
      firstname,
      lastname,
      role,
    };
    const response = await gqlClient.request(CreateNextUserMutation, {
      userData,
    });
    if (!response?.createNextUser) {
      throw new Error("CreateUser Failed");
    }
    const token = jwt.sign({ user: response.createNextUser }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });
    return { user: response.createNextUser, token };
  }

  async signin(email, password) {
    const getUserResponse = await gqlClient.request(GetUserByEmailQuery, {
      email,
    });
    const { nextUser } = getUserResponse;
    if (!nextUser) {
      throw new Error("Este usuário não existe!");
    }
    const isMatch = await bcrypt.compare(password, nextUser.password);
    if (!isMatch) {
      throw new Error("Email ou senha inválidos");
    }
    const token = jwt.sign(
      {
        id: nextUser.id,
        email: nextUser.email,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );
    return token;
  }

  async getCurrentUser(token) {
    const decoded = jwt.verify(token, JWT_SECRET);
    const getUserResponse = await gqlClient.request(GetUserByEmailQuery, {
      email: decoded.email,
    });
    const { nextUser } = getUserResponse;
    if (!nextUser) {
      throw new Error("User not found");
    }
    delete nextUser.password;
    return nextUser;
  }

  async getVideos(ambiente, modulo, subModulo) {
    const getVideosResponse = await gqlClient.request(GetVideosQuery, {
      ambiente,
      modulo,
      subModulo,
    });
    const { videos } = getVideosResponse;
    if (!videos) {
      throw new Error("Videos não encontrados");
    }
    return videos;
  }

  async getQuestions() {
    const getQuestionsResponse = await gqlClient.request(GetQuestionsQuery);
    const { questions } = getQuestionsResponse;
    if (!questions) {
      throw new Error("Questões não encontradas");
    }
    return questions;
  }

  async getAmbientes() {
    const getAmbientesResponse = await gqlClient.request(GetAmbientesQuery);
    const { ambientes } = getAmbientesResponse;
    if (!ambientes) {
      throw new Error("Ambientes não encontrados");
    }
    return ambientes;
  }

  async getModulos() {
    const getModulosResponse = await gqlClient.request(GetModulosQuery);
    const { modulos } = getModulosResponse;
    if (!modulos) {
      throw new Error("Modulos não encontrados");
    }
    return modulos;
  }

  async getSubModulos() {
    const getSubModulosResponse = await gqlClient.request(GetSubModulosQuery);
    const { subModulos } = getSubModulosResponse;
    if (!subModulos) {
      throw new Error("SubModulos não encontrados");
    }
    return subModulos;
  }

  async getTreinamentos() {
    const getTreinamentosResponse = await gqlClient.request(GetTreinamentosQuery);
    const { treinamentos } = getTreinamentosResponse;
    if (!treinamentos) {
      throw new Error("Treinamentos não encontrados");
    }
    return treinamentos;
  }

  async getAvaliacoes() {
    const getAvaliacoesResponse = await gqlClient.request(GetAvaliacoesQuery);
    const { avaliacoes } = getAvaliacoesResponse;
    if (!avaliacoes) {
      throw new Error("Avaliações não encontradas");
    }
    return avaliacoes;
  }

  async createVideo(createVideoRequest) {
    const { titulo, ambiente, modulo, url, subModulo, descricao, videoId } = createVideoRequest;
  
    const videoData = {
      titulo,
      ambiente,
      modulo,
      url,
      subModulo,
      descricao,
      videoId,
    };
    const response = await gqlClient.request(CreateVideoMutation, {
      videoData,
    });
    if (!response?.createVideo) {
      throw new Error("CreateVideo Failed");
    }
    return { user: response.createVideo };
  }

  async createTreinamento(createTreinamentoRequest) {
    const { titulo, descricao, ambiente, modulo, subModulo } = createTreinamentoRequest;
    const treinamentoData = {
      titulo,
      descricao,
      ambiente,
      modulo,
      subModulo,
    };
    const response = await gqlClient.request(CreateTreinamentoMutation, {
      treinamentoData,
    });
    if (!response?.createTreinamento) {
      throw new Error("CreateTreinamento Failed");
    }
    return { user: response.createTreinamento };
  }

  async createAvaliacao(createAvaliacaoRequest) {
    const { titulo, descricao, ambiente, modulo, subModulo } = createAvaliacaoRequest;
    const avaliacaoData = {
      titulo,
      descricao,
      ambiente,
      modulo,
      subModulo,
    };
    const response = await gqlClient.request(CreateAvaliacaoMutation, {
      avaliacaoData,
    });
    if (!response?.createAvaliacao) {
      throw new Error("CreateAvaliacao Failed");
    }
    return { user: response.createAvaliacao };
  }

  async createQuestion(createQuestionRequest) {
    const { title, ambiente, modulo, subModulo, nivel, answerOptions } = createQuestionRequest;
    const questionData = {
      title,
      ambiente,
      modulo,
      nivel,
      subModulo,
      answerOptions,
    };
    const response = await gqlClient.request(CreateQuestionMutation, {
      questionData,
    });
    if (!response?.createQuestion) {
      throw new Error("CreateQuestion Failed");
    }
    return { user: response.createQuestion };
  }

  async updateUserWatchedVideos(updatedUserWatchedVideosRequest) {
    const { email, watchedVideos } = updatedUserWatchedVideosRequest;
    const response = await gqlClient.request(updateUserWatchedVideosMutation, {
      email,
      watchedVideos,
    });
    if (!response?.updateNextUser) {
      throw new Error("UpdateUserWatchedVideos Failed");
    }
    return response.updateNextUser;
  }

  async updateUserAnsweredValuations(updatedUserAnsweredValuationsRequest) {
    const { email, answeredValuations } = updatedUserAnsweredValuationsRequest;
    const response = await gqlClient.request(updateUserAnsweredValuationsMutation, {
      email,
      answeredValuations,
    });
    if (!response?.updateNextUser) {
      throw new Error("UpdateUserAnsweredValuations Failed");
    }
    return response.updateNextUser;
  }


}

export default AuthService;