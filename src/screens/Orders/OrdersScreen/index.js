import React from 'react';
// import { graphql, compose, withApollo } from 'react-apollo';
import styled from 'styled-components/native';
import OrdersComponent from '@components/Orders/OrdersComponent';
import data from '@utils/orders.json';
// import { connect } from 'react-redux';
// import getOrdersQuery from '../graphql/queries/getOrders'
// import meQuery from '../graphql/queries/me';
// import { getMe }from '../actions/client';
// import orderAddedSubscription from '../graphql/subscriptions/orderAdded';

const Root = styled.View`
  flex: 1;
`;

const OrdersScreen = () => {
  return (
    <Root>
      <OrdersComponent data={data} />
    </Root>
  );
};

export default OrdersScreen;

// export default withApollo(compose(
//         connect(undefined, { getMe }),
//         graphql(getOrdersQuery)
//         )(OrdersScreen));
