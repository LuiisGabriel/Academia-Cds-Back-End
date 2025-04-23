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



