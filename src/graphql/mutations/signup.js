import gql from 'graphql-tag';

export default gql`
mutation signupClient(
    $fullName: String!
    $email: String!
    $password: String!
    $username: String!
    $avatar: String
    ){
        signupClient(
            fullName: $fullName
            email: $email
            password: $password
            username: $username
            avatar: $avatar
        ){
            token
        }
}
`;
