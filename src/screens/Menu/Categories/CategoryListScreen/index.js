import React, {useLayoutEffect} from 'react';
import styled from 'styled-components/native';
import CategoryListComponent from '@components/Menu/CategoriesComponent/CategoryListComponent';
import categories from '@utils/categories.json';
import menu from '@utils/menu';

const Root = styled.View`
  flex: 1;
`;

const CategoryListScreen = ({navigation, route}) => {
  const {name} = route.params.params;

  useLayoutEffect(() => {
    navigation.setOptions({headerTitle: name});
  }, [navigation, route]);

  return (
    <Root>
      <CategoryListComponent categories={categories} menu={menu} />
    </Root>
  );
};

export default CategoryListScreen;
