import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import gqlClient from "../graphql/client.js";
import { CreateNextUserMutation, GetUserByEmailQuery, updateUserWatchedVideosMutation, GetAmbientesQuery, GetModulosQuery, GetSubModulosQuery, GetTreinamentosQuery, CreateTreinamentoMutation, GetAvaliacoesQuery, CreateAvaliacaoMutation, updateUserAnsweredValuationsMutation, publishValuationMutation, GetNextUsersQuery, publishTrainmentMutation, unpublishTrainmentMutation, deleteTrainmentMutation, deleteValuationMutation, unpublishValuationMutation, updateTrainmentVideosMutation, updateValuationQuestionsMutation } from "../graphql/mutations.js";

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

  async getNextUsers() {
    const getNextUsersResponse = await gqlClient.request(GetNextUsersQuery);
    const { nextUsers } = getNextUsersResponse;
    if (!nextUsers) {
      throw new Error("Usuários não encontrados");
    }
    return nextUsers;
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


  async createTreinamento(createTreinamentoRequest) {
    const { titulo, descricao, ambiente, modulo, subModulo, videos } = createTreinamentoRequest;
    const treinamentoData = {
      titulo,
      descricao,
      ambiente,
      modulo,
      subModulo,
      videos,
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
    const { titulo, descricao, ambiente, modulo, subModulo, valuationQuestions } = createAvaliacaoRequest;
    const avaliacaoData = {
      titulo,
      descricao,
      ambiente,
      modulo,
      subModulo,
      valuationQuestions,
    };
    const response = await gqlClient.request(CreateAvaliacaoMutation, {
      avaliacaoData,
    });
    if (!response?.createAvaliacao) {
      throw new Error("CreateAvaliacao Failed");
    }
    return { user: response.createAvaliacao };
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

  async updateTrainmentVideos(updatedTrainmentRequest) {
    const { titulo, videos } = updatedTrainmentRequest;
    const response = await gqlClient.request(updateTrainmentVideosMutation, {
      titulo,
      videos,
    });
    if (!response?.updateTreinamento) {
      throw new Error("UpdateTrainmentVideos Failed");
    }
    return response.updateTreinamento;
  }

  async updateValuationQuestions(updatedValuationRequest) {
    const { titulo, valuationQuestions } = updatedValuationRequest;
    const response = await gqlClient.request(updateValuationQuestionsMutation, {
      titulo,
      valuationQuestions,
    });
    if (!response?.updateAvaliacao) {
      throw new Error("UpdateValuationQuestions Failed");
    }
    return response.updateAvaliacao;
  }

  async publishValuation(publishedValuationRequest) {
    const { titulo } = publishedValuationRequest;
    const response = await gqlClient.request(publishValuationMutation, {
      titulo,
    });
    if (!response?.publishAvaliacao) {
      throw new Error("PublishValuation Failed");
    }
    return response.publishAvaliacao;
  }

  async unpublishValuation(unpublishedValuationRequest) {
    const { titulo } = unpublishedValuationRequest;
    const response = await gqlClient.request(unpublishValuationMutation, {
      titulo,
    });
    if (!response?.unpublishAvaliacao) {
      throw new Error("UnpublishValuation Failed");
    }
    return response.unpublishAvaliacao;
  }

  async deleteValuation(deletedValuationRequest) {
    const { titulo } = deletedValuationRequest;
    const response = await gqlClient.request(deleteValuationMutation, {
      titulo,
    });
    if (!response?.deleteAvaliacao) {
      throw new Error("DeleteValuation Failed");
    }
    return response.deleteAvaliacao;
  }

  async publishTrainment(publishedTrainmentRequest) {
    const { titulo } = publishedTrainmentRequest;
    const response = await gqlClient.request(publishTrainmentMutation, {
      titulo,
    });
    if (!response?.publishTreinamento) {
      throw new Error("PublishTrainment Failed");
    }
    return response.publishTreinamento;
  }

  async unpublishTrainment(unpublishedTrainmentRequest) {
    const { titulo } = unpublishedTrainmentRequest;
    const response = await gqlClient.request(unpublishTrainmentMutation, {
      titulo,
    });
    if (!response?.unpublishTreinamento) {
      throw new Error("UnpublishTrainment Failed");
    }
    return response.unpublishTreinamento;
  }

  async deleteTrainment(deletedTrainmentRequest) {
    const { titulo } = deletedTrainmentRequest;
    const response = await gqlClient.request(deleteTrainmentMutation, {
      titulo,
    });
    if (!response?.deleteTreinamento) {
      throw new Error("DeleteTrainment Failed");
    }
    return response.deleteTreinamento;
  }

}

export default AuthService;