import React from 'react';
import styled from 'styled-components/native';
import Card from './Card';
import faqs from '@utils/faqs.json';

const Root = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => props.theme.THIRD_BACKGROUND_COLOR_LIGHT};
`;
const FAQSList = styled.FlatList`
  flex-direction: column;
  padding: 10px 10px;
`;

const FAQSComponent = () => {
  return (
    <Root>
      <FAQSList
        contentContainerStyle={{
          alignSelf: 'stretch',
        }}
        data={faqs.data}
        keyExtractor={(item) => item._id.toString()}
        showsVerticalScrollIndicator={false}
        // refreshing={refresher}
        // onRefresh={() => _getData()}
        renderItem={({item}) => {
          return <Card key={item._id} {...item} />;
        }}
      />
    </Root>
  );
};

export default React.memo(FAQSComponent);
