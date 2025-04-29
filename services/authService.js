import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import gqlClient from "../graphql/client.js";
import { CreateNextUserMutation, GetUserByEmailQuery, CreateVideoMutation, GetVideosQuery, updateUserWatchedVideosMutation, CreateQuestionMutation } from "../graphql/mutations.js";

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

  async createVideo(createVideoRequest) {
    const { titulo, ambiente, modulo, url, subModulo } = createVideoRequest;
    const videoData = {
      titulo,
      ambiente,
      modulo,
      url,
      subModulo,
    };
    const response = await gqlClient.request(CreateVideoMutation, {
      videoData,
    });
    if (!response?.createVideo) {
      throw new Error("CreateVideo Failed");
    }
    return { user: response.createVideo };
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
    const { email, watchedvideos } = updatedUserWatchedVideosRequest;
    const response = await gqlClient.request(updateUserWatchedVideosMutation, {
      email,
      watchedvideos,
    });
    if (!response?.updateNextUser) {
      throw new Error("UpdateUserWatchedVideos Failed");
    }
    return response.updateNextUser;
  }


}

export default AuthService;