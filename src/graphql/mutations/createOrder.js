import gql from 'graphql-tag';

export default gql`
    mutation createOrder($text: String!){
        createOrder(text: $text){
            _id
            text
            favoriteCount
            createdAt
            client{
                avatar
                username
                firstname
                lastname
            }
        }
    }
`;
