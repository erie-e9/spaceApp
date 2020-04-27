import gql from 'graphql-tag';

export default gql`
   subscription {
        orderAdded {
            _id
            text
            favoriteCount
            createdAt
            client{
                username
                firstname
                lastname
                avatar
            }
        }
   }
`;
