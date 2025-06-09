import { gql } from 'graphql-request';

export const GetUserByEmailQuery = gql`
query getUserByEmailQuery($email: String!) {
  nextUser(where: {email: $email}, stage: DRAFT) {
    id
    email 
    firstname
    lastname
    password
    photo{
    url
    }
    role
    watchedVideos
    answeredValuations
  }
}
`;

export const GetNextUsersQuery = gql`
query getNextUsers {
  nextUsers(
    stage: DRAFT
    first: 999999
  ){
    id
    role
    email
    firstname
    lastname
    answeredValuations
    watchedVideos
    photo{
      url
    }
  }
}
`;

export const GetAmbientesQuery = gql`
query getAmbientes{
  ambientes(
    stage: DRAFT
    first: 999999
  ){
    nome
  }
}
`;

export const GetModulosQuery = gql`
query getModulos{
  modulos(
    stage: DRAFT
    first: 999999
  ){
    nome
  }
}
`;

export const GetSubModulosQuery = gql`
query getSubModulos{
  subModulos(
    stage: DRAFT
    first: 999999
  ){
    nome
  }
}
`;

export const GetTreinamentosQuery = gql`
query getTreinamentos{
  treinamentos(
    stage: DRAFT
    first: 999999
  ){
    titulo
    descricao
    ambiente
    modulo
    subModulo
    videos
    documentInStages {
      stage
    }
  }
}
`;

export const GetAvaliacoesQuery = gql`
query getAvaliacoes{
  avaliacoes(
    stage: DRAFT
    first: 999999
  ){
    id
    titulo
    descricao
    ambiente
    modulo
    subModulo
    valuationQuestions
    documentInStages {
      stage
    }
  }
}
`;

export const CreateTreinamentoMutation = gql`
    mutation CreateTreinamento($treinamentoData: TreinamentoCreateInput!) {
      createTreinamento(data: $treinamentoData) {
      id
    }
  } 
 `;

export const CreateAvaliacaoMutation = gql`
 mutation CreateAvaliacao($avaliacaoData: AvaliacaoCreateInput!) {
   createAvaliacao(data: $avaliacaoData) {
   id
 }
} 
`;

export const CreateNextUserMutation = gql`
    mutation CreateNextUser($userData: NextUserCreateInput!) {
      createNextUser(data: $userData) {
      id

    }
  }
`;

export const updateUserWatchedVideosMutation = gql`
mutation updateNextUserWatchedVideos($watchedVideos: Json!, $email: String!) {
    updateNextUser(where:{email: $email}, data: {watchedVideos: $watchedVideos}){
      email
      watchedVideos
    }
  }
`;

export const updateUserAnsweredValuationsMutation = gql`
mutation updateNextUserAnsweredValuations($answeredValuations: Json!, $email: String!) {
    updateNextUser(where: { email: $email }, data: { answeredValuations: $answeredValuations }) {
        email
        answeredValuations
    }
}
`;

export const updateTrainmentVideosMutation = gql`
mutation updateTrainmentVideos($titulo: String!, $videos: Json! ) {
  updateTreinamento(data: {videos: $videos}, where: {titulo: $titulo}){
    titulo
    videos
  }
}
`;

export const updateValuationQuestionsMutation = gql`
mutation updateValuationQuestions($titulo: String!, $valuationQuestions: Json! ) {
  updateAvaliacao(data: {valuationQuestions: $valuationQuestions}, where: {titulo: $titulo}){
    titulo
    valuationQuestions
  }
}
`;

export const updateNextUserMutation = gql`
mutation updateNextUserMutation ($email: String!,  $firstname: String!, $lastname: String!, $role: String!, $answeredValuations: Json!) {
  updateNextUser(
    where: {email: $email},
    data: {firstname: $firstname, lastname: $lastname, role: $role, answeredValuations: $answeredValuations}
  ) {
    email
  }
}
`;

export const redefinePasswordMutation = gql`
mutation redefinePasswordMutation($email: String!, $password:String!) {
  updateNextUser(where: {email: $email}, data: {password: $password}){
    email
  }
}
`;

export const publishValuationMutation = gql`
mutation MyMutation($titulo: String!) {
  publishAvaliacao(where: {titulo: $titulo}, to: PUBLISHED) {
    id
  }
}`;

export const unpublishValuationMutation = gql`
mutation unpublishValuationMuation($titulo: String!) {
  unpublishAvaliacao(where: {titulo: $titulo}) {
    id
  }
}`;

export const deleteValuationMutation = gql`
mutation deleteValuationMuation($titulo: String!) {
  deleteAvaliacao(where: {titulo: $titulo}) {
    id
  }
}`;

export const deleteNextUserMutation = gql`
mutation deleteNextUserMutation($email: String!) {
  deleteNextUser(where: {email: $email}){
    id
  }
}`;

export const publishTrainmentMutation = gql`
mutation publishTrainmentMuation($titulo: String!) {
  publishTreinamento(where: {titulo: $titulo}, to: PUBLISHED) {
    id
  }
}`;

export const unpublishTrainmentMutation = gql`
mutation unpublishTrainmentMuation($titulo: String!) {
  unpublishTreinamento(where: {titulo: $titulo}) {
    id
  }
}`;

export const deleteTrainmentMutation = gql`
mutation deleteTrainmentMuation($titulo: String!) {
  deleteTreinamento(where: {titulo: $titulo}) {
    id
  }
}`;





