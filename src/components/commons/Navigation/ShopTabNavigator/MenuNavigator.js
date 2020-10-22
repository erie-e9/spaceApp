import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components/native'
import { Platform } from 'react-native'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack'
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@icons'
import { ETASearchBar } from '@etaui'
import { variables } from '@utils/constants'
import MenuScreen from '@screens/Menu/MenuScreen'
import CategoryListScreen from '@screens/Menu/Categories/CategoryListScreen'
import CategoryItemsScreen from '@screens/Menu/Categories/CategoryItemsScreen'
import PromotionScreen from '@screens/Menu/PromotionScreen'
import SectionScreen from '@screens/Menu/SectionScreen'
import AllItemsScreen from '@screens/Menu/AllItemsScreen'
import GetOneItemScreen from '@screens/Menu/GetOneItemScreen'
import CustomProductNavigator from './CustomProductNavigator'
import { createSharedElementStackNavigator } from 'react-navigation-shared-element'

const Header = styled.View`
	margin-left: 15px;
`
const HeaderLeft = styled.TouchableOpacity.attrs({
	underlayColor: 'transparent',
	hitSlop: {top: 25, bottom: 25, right: 25, left: 25}
})`
	z-index: 100;
	width: 50px;
	margin-left: 15px;
`
const HeaderLeftCard = styled.TouchableOpacity.attrs({
	underlayColor: 'transparent',
	hitSlop: {top: 25, bottom: 25, right: 25, left: 25}
})`
	height: 25px;
	width: 25px;
	z-index: 100;
	justify-content: center;
	align-items: center;
	margin-left: 15px;
	margin-top: 25px;
	border-radius: 15px;
	background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
`
const IconButton = styled.TouchableOpacity.attrs({
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

const MenuStack = createStackNavigator()
const MenuNavigator = () => {
	const themeContext = useContext(ThemeContext)
	return (
		<MenuStack.Navigator
			screenOptions={{
				headerTransparent: !true,
				headerShown: !true,
				headerTintColor: themeContext.PRIMARY_TEXT_COLOR_LIGHT,
				headerStyle: {
					backgroundColor:
						themeContext.PRIMARY_TEXT_BACKGROUND_COLOR,
					shadowColor: 'black',
					shadowOpacity: 0,
					shadowOffset: {height: 0},
					shadowRadius: 5,
					elevation: 0,
				},
				headerTitleStyle: {
					fontWeight: 'bold',
				},
			}}>
			<MenuStack.Screen
				name='MenuScreen'
				component={MenuScreen}
				options={{
					headerTitle: '',
					headerShown: true,
					// headerLeft: () => (
					// 	<Header>
					// 		<ETASimpleText
					// 			size={22}
					// 			weight={
					// 				Platform.OS === 'ios'
					// 					? 'bold'
					// 					: 'bold'
					// 			}
					// 			color={
					// 				themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
					// 			}
					// 			align='left'>
					// 			{variables.COMPANYNAME}
					// 		</ETASimpleText>
					// 	</Header>
					// ),
					// headerRight: () => <ETASearchBar />,
					header: () =>  <ETASearchBar 
										leftContent={variables.COMPANYNAME} 
										leftContentColor={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR} 
										placeholderText={`Search on ${variables.COMPANYNAME}`}
										backgroundColorInput={themeContext.PRIMARY_TEXT_BACKGROUND_COLOR}
									/>,
				
				}}
			/>
		</MenuStack.Navigator>
	)
}

const SubMenuStack = createSharedElementStackNavigator()
const SubMenuNavigator = () => {
	const themeContext = useContext(ThemeContext)
	
	return (
		<SubMenuStack.Navigator
			screenOptions={{
				headerTransparent: !true,
				headerShown: !true,
				headerTintColor: themeContext.PRIMARY_TEXT_COLOR_LIGHT,
				headerStyle: {
					backgroundColor:
						themeContext.PRIMARY_TEXT_BACKGROUND_COLOR,
					shadowColor: 'black',
					shadowOpacity: 0,
					shadowOffset: {height: 0},
					shadowRadius: 5,
					elevation: 0,
				},
				headerTitleStyle: {
					fontWeight: '400',
					fontSize: 12,
				},
			}}
		>			
			<SubMenuStack.Screen
				name='CategoryListScreen'
				component={CategoryListScreen}
				options={({navigation, route}) => ({
					headerTitle: '',
					headerShown: true,
					headerTransparent: !true,
					headerTitleAlign: 'center',
					headerTitleStyle: {
						fontWeight: '400',
						color:
							themeContext.SECONDARY_TEXT_BACKGROUND_COLOR,
						fontSize: 18,
					},
					headerLeft: () => (
						<HeaderLeft
							onPress={() => navigation.goBack()}>
							<FontAwesome
								name='angle-left'
								size={25}
								color={
									themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
								}
							/>
						</HeaderLeft>
					),
					headerTintColor:
						themeContext.PRIMARY_TEXT_COLOR_LIGHT,
					cardStyleInterpolator:
						CardStyleInterpolators.forHorizontalIOS,
				})}
			/>

			<SubMenuStack.Screen
				name='CategoryItemsScreen'
				component={CategoryItemsScreen}
				options={({navigation, route}) => ({
					headerTitle: '',
					headerShown: true,
					headerTransparent: !true,
					headerTitleAlign: 'center',
					headerTitleStyle: {
						fontWeight: '400',
						color:
							themeContext.SECONDARY_TEXT_BACKGROUND_COLOR,
						fontSize: 18,
					},
					headerLeft: () => (
						<HeaderLeft
							onPress={() => navigation.goBack()}>
							<FontAwesome
								name='angle-left'
								size={25}
								color={
									themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
								}
							/>
						</HeaderLeft>
					),
					headerRight: () => (
						<IconButton
							activeOpacity={1}
							underlayColor='#ccd0d5'
							onPress={() => console.log('ewe')}
							>
							<MaterialCommunityIcons
								name='filter'
								size={20}
								color='#000'
							/>
						</IconButton>
					),
					headerTintColor:
						themeContext.PRIMARY_TEXT_COLOR_LIGHT,
					cardStyleInterpolator:
						CardStyleInterpolators.forHorizontalIOS,
				})}
			/>

			<SubMenuStack.Screen
				name='PromotionScreen'
				component={PromotionScreen}
				options={({navigation, route}) => ({
					headerTitle: '',
					headerShown: true,
					headerTransparent: !true,
					headerTitleAlign: 'center',
					headerTitleStyle: {
						fontWeight: '400',
						color:
							themeContext.SECONDARY_TEXT_BACKGROUND_COLOR,
						fontSize: 18,
					},
					headerLeft: () => (
						<HeaderLeft
							onPress={() => navigation.goBack()}>
							<FontAwesome
								name='angle-left'
								size={25}
								color={
									themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
								}
							/>
						</HeaderLeft>
					),
					headerRight: () => (
						<IconButton
							activeOpacity={1}
							underlayColor='#ccd0d5'
							onPress={() => console.log('ewe')}
							>
							<MaterialCommunityIcons
								name='filter'
								size={20}
								color='#000'
							/>
						</IconButton>
					),
					headerTintColor:
						themeContext.PRIMARY_TEXT_COLOR_LIGHT,
					cardStyleInterpolator:
						CardStyleInterpolators.forHorizontalIOS,
				})}
			/>

			<SubMenuStack.Screen
				name='SectionScreen'
				component={SectionScreen}
				options={({navigation, route}) => ({
					headerTitle: '',
					headerShown: true,
					headerTransparent: !true,
					headerTitleAlign: 'center',
					headerShown: true,
					headerTransparent: !true,
					headerTitleAlign: 'center',
					headerTitleStyle: {
						fontWeight: '400',
						color:
							themeContext.SECONDARY_TEXT_BACKGROUND_COLOR,
						fontSize: 18,
					},
					headerLeft: () => (
						<HeaderLeft
							onPress={() => navigation.goBack()}>
							<FontAwesome
								name='angle-left'
								size={25}
								color={
									themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
								}
							/>
						</HeaderLeft>
					),
					headerRight: () => (
						<IconButton
							activeOpacity={1}
							underlayColor='#ccd0d5'
							onPress={() => console.log('ewe')}
							>
							<MaterialCommunityIcons
								name='filter'
								size={20}
								color='#000'
							/>
						</IconButton>
					),
					headerTintColor:
						themeContext.PRIMARY_TEXT_COLOR_LIGHT,
					cardStyleInterpolator:
						CardStyleInterpolators.forHorizontalIOS,
				})}
			/>

			<SubMenuStack.Screen
				name='AllItemsScreen'
				component={AllItemsScreen}
				options={({navigation, route}) => ({
					headerTitle: 'Products',
					headerShown: true,
					headerTransparent: !true,
					headerTitleAlign: 'center',
					headerTitleStyle: {
						fontWeight: '400',
						color:
							themeContext.SECONDARY_TEXT_BACKGROUND_COLOR,
						fontSize: 18,
					},
					headerLeft: () => (
						<HeaderLeft
							onPress={() => navigation.goBack()}>
							<FontAwesome
								name='angle-left'
								size={25}
								color={
									themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
								}
							/>
						</HeaderLeft>
					),
					headerRight: () => (
						<IconButton
							activeOpacity={1}
							underlayColor='#ccd0d5'
							onPress={() => console.log('ewe')}
							>
							<MaterialCommunityIcons
								name='filter'
								size={20}
								color='#000'
							/>
						</IconButton>
					),
					headerTintColor:
						themeContext.PRIMARY_TEXT_COLOR_LIGHT,
					cardStyleInterpolator:
						CardStyleInterpolators.forHorizontalIOS,
				})}
			/>
		</SubMenuStack.Navigator>
	)
}

const GetOneItemStack = createSharedElementStackNavigator()
const GetOneItemNavigator = () => {
	const themeContext = useContext(ThemeContext)
	
	return (
		<GetOneItemStack.Navigator>
			<GetOneItemStack.Screen
				name='GetOneItemScreen'
				component={GetOneItemScreen}
				sharedElementsConfig={(route, otherRoute, showing) => {
					const { item } = route.params;
					return [`item.${item.id}.photo`];
				}}
				options={({navigation, route}) => ({
					headerTitle: '',
					headerShown: true,
					headerTransparent: true,
					headerTitleAlign: 'center',
					headerTitleStyle: {
						fontWeight: '500',
						color:
							themeContext.SECONDARY_TEXT_BACKGROUND_COLOR,
					},
					headerLeft: () => (
						<HeaderLeftCard
							onPress={() => navigation.goBack()}>
							<Ionicons
								name='md-close'
								size={18}
								color={
									themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
								}
							/>
						</HeaderLeftCard>
					),
					headerTintColor:
						themeContext.PRIMARY_TEXT_COLOR_LIGHT,
					// cardStyleInterpolator:
					// 	CardStyleInterpolators.forModalPresentationIOS,
				})}
			/>
		</GetOneItemStack.Navigator>
	)
}

export { MenuNavigator, SubMenuNavigator, GetOneItemNavigator, CustomProductNavigator }
