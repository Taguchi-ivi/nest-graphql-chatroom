import { gql } from '@apollo/client';

export const UPDATE_PROFILE = gql`
  mutation UpdateProfile(
    $fullname: String!
    $filename: String!
    $chatroomId: Float!
  ) {
    updateProfile(filename: $filename, file: $file, chatroomId: $chatroomId) {
      id
      fullname
      avatarUrl
    }
  }
`;
