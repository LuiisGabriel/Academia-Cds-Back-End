import { gql } from 'graphql-request';

export const CreateNextUserMutation = gql`
    mutation CreateNextUser($userData: NextUserCreateInput!) {
      createNextUser(data: $userData) {
      id
      email
    }
  }
`;

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
    watchedvideos
  }
}
`;


export const CreateVideoMutation = gql`
    mutation CreateVideo($videoData: VideoCreateInput!) {
      createVideo(data: $videoData) {
      id
      titulo
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

export const GetVideosQuery = gql`
query getVideos($modulo: String, $subModulo: String, $ambiente: String) {
  videos(
    first: 999999
    stage: DRAFT
    where: {modulo: $modulo, AND: {subModulo: $subModulo, AND: {ambiente: $ambiente}}}
  ) {
    id
    titulo
    modulo
    subModulo
    ambiente
    url
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

export const updateUserWatchedVideosMutation = gql `
mutation updateNextUserWatchedvideos($watchedvideos: [String!], $email: String!) {
    updateNextUser(where:{email: $email}, data: {watchedvideos: $watchedvideos}){
      email
      watchedvideos
    }
  }
`;




