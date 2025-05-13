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

export const GetVideosQuery = gql`
query getVideos($modulo: String, $subModulo: String, $ambiente: String) {
  videos(
    first: 999999
    stage: DRAFT
    where: {modulo: $modulo, AND: {subModulo: $subModulo, AND: {ambiente: $ambiente}}}
  ) {
    id
    titulo
    descricao
    modulo
    subModulo
    ambiente
    url
    videoId
  }
}
`;

export const GetQuestionsQuery = gql`
query getQuestions{
  questions(
    first: 999999
    stage: DRAFT
  ){
    title
    nivel
    ambiente
    modulo
    subModulo
    answerOptions
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
  }
}
`;

export const CreateVideoMutation = gql`
    mutation CreateVideo($videoData: VideoCreateInput!) {
      createVideo(data: $videoData) {
      id
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

export const CreateQuestionMutation = gql`
   mutation CreateQuestion($questionData: QuestionCreateInput!) {
      createQuestion(data: $questionData) {
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




