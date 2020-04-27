import gql from 'graphql-tag';

export default gql`
{
getOrders {
      _id
      text
      createdAt
      favoriteCount
      client {
        username
        avatar
        firstname
        lastname
      }
    }
  }
`;
