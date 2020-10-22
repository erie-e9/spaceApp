import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components/native'
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer'
import { MaterialCommunityIcons } from '@icons'

const HeaderRight = styled.TouchableOpacity.attrs({
	underlayColor: 'transparent',
	hitSlop: {top: 25, bottom: 25, right: 25, left: 25}
})`
	flex-direction: row;
	justify-content: center;
	align-items: center;
	width: 32px;
	height: 32px;
	border-radius: 32px;
	margin-horizontal: 5px;
	margin-right: 15px;
	background-color: #e4e6eb;
`

function Feed({ navigation }) {
  return (
        <HeaderRight
            onPress={() => navigation.openDrawer()}>
            <MaterialCommunityIcons
                name='filter'
                size={20}
                color='#000'
            />
        </HeaderRight>
  )
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      {/* <DrawerItemList {...props} /> */}
      <DrawerItem
        label="Close drawer"
        onPress={() => props.navigation.closeDrawer()}
      />
      <DrawerItem
        label="Toggle drawer"
        onPress={() => props.navigation.toggleDrawer()}
      />
    </DrawerContentScrollView>
  )
}

const Drawer = createDrawerNavigator()

function MyDrawer() {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
      {/* <Drawer.Screen name="Feed" component={Feed} />
      <Drawer.Screen name="Notifications" component={Notifications} /> */}
    </Drawer.Navigator>
  )
}

export { MyDrawer }