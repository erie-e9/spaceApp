import React, {useContext} from 'react'
import {Platform, Dimensions} from 'react-native'
import styled, {ThemeContext} from 'styled-components/native'
import {ETASimpleText, ETAAutoScroll} from '@etaui'

const {width} = Dimensions.get('window')

const Root = styled.View`
	flex: 1;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: transparent;
`
const InfoContainer = styled.View`
	flex: 1;
	flex-direction: column;
	justify-content: center;
	width: ${width - 40}px;
	background-color: transparent;
`

const SubHeadAboutUsComponent = () => {
	const themeContext = useContext(ThemeContext)

	return (
		<Root>
			<ETAAutoScroll>
				<InfoContainer time={5000}>
					<ETASimpleText
						size={12}
						weight={
							Platform.OS === 'ios' ? '300' : '200'
						}
						color={
							themeContext.PRIMARY_TEXT_COLOR_LIGHT
						}
						align='justify'>
						Omnis eaque harum nam harum similique. Quasi
						eaque sapiente mollitia qui repudiandae
						rerum. Nostrum voluptas inventore
						voluptatem. Et voluptatem ab sint blanditiis
						ut occaecati quis quod in. Sapiente eos
						repellat cum sapiente ut sequi explicabo
						commodi aut. Est cumque unde. Dolor dolores
						et praesentium et eos voluptatibus.
					</ETASimpleText>

					<ETASimpleText
						size={12}
						weight={
							Platform.OS === 'ios' ? '300' : '200'
						}
						color={
							themeContext.PRIMARY_TEXT_COLOR_LIGHT
						}
						align='justify'>
						Sint et reiciendis id rerum qui nisi
						veritatis et. Pariatur esse qui blanditiis
						quia repellendus provident laudantium non.
						Et quae occaecati aspernatur. Tempora sint
						aut pariatur sit. Quia necessitatibus eos.
						Culpa cumque quia fugit possimus id. Qui est
						et corrupti laborum animi. Aspernatur sit
						quas veniam dolores magni libero voluptatum
						laborum delectus. Odit voluptate dolor.
						Corrupti laboriosam ad optio. Rerum est aut
						nisi commodi natus laboriosam. Eum delectus
						accusantium. Et earum fugiat. Qui sapiente
						sit reiciendis animi consectetur voluptatum.
						Ab tempora nihil. Dignissimos veniam omnis
						rerum quo beatae aliquid enim voluptas
						laboriosam. Est provident ipsum tempora
						autem cum. Sapiente consequatur in placeat
						dolor dolore est sint a similique. Ratione
						et ab in non qui sapiente est et. Veniam
						excepturi harum sunt consequuntur dicta
						molestiae voluptas.
					</ETASimpleText>

					<ETASimpleText
						size={12}
						weight={
							Platform.OS === 'ios' ? '300' : '200'
						}
						color={
							themeContext.PRIMARY_TEXT_COLOR_LIGHT
						}
						align='justify'>
						Vero porro aperiam. Explicabo aut omnis
						minima eaque. Tenetur aut mollitia maxime
						non pariatur. Enim libero suscipit quo. Qui
						aut eaque iusto. Nihil autem ut nihil
						mollitia est. Natus aut neque excepturi
						animi debitis sunt. Sit voluptatibus libero.
						Officia qui optio rerum sunt velit porro.
						Cum aliquam nihil. Asperiores ducimus quasi
						ullam assumenda magnam quis reprehenderit
						qui. Qui minima doloremque eos voluptatum
						vel rerum et.
					</ETASimpleText>

					<ETASimpleText
						size={12}
						weight={
							Platform.OS === 'ios' ? '300' : '200'
						}
						color={
							themeContext.PRIMARY_TEXT_COLOR_LIGHT
						}
						align='justify'>
						Ullam laudantium non sint. Qui ex nemo
						quidem quia dolor odio ut tempore possimus.
						Vel deserunt quos voluptas quo ab. Beatae
						laborum nesciunt assumenda quis quas
						repellendus voluptatem fuga. Quis qui quas
						sit et explicabo dignissimos alias sequi
						aut. Rerum est qui qui. Et deserunt sint ut
						a pariatur nam. Est omnis dolorum nisi ex
						qui rerum. Voluptas molestiae inventore.
						Omnis voluptatem nulla qui. Inventore minima
						ab. Doloribus quia nesciunt quos est.
						Exercitationem error qui.
					</ETASimpleText>

					<ETASimpleText
						size={12}
						weight={
							Platform.OS === 'ios' ? '300' : '200'
						}
						color={
							themeContext.PRIMARY_TEXT_COLOR_LIGHT
						}
						align='justify'>
						Suscipit eaque voluptatem facilis
						reprehenderit ea tempore inventore
						laboriosam voluptatem. Sint labore cum aut
						alias ullam. Facilis quo repellendus dolorem
						ipsa molestias. Aut corporis amet ea sit.
						Vero vero quam ea quaerat. Ex velit est
						adipisci dolores soluta eos. Voluptas eum
						voluptates minima facere. Sint similique
						animi. Ratione recusandae molestiae illum
						est eos eius culpa. Iure et autem voluptas
						sed nesciunt dolores. Ut odit incidunt.
						Repellat rerum ex. Minima dolor aut. Sit
						neque sequi. Dignissimos corrupti optio
						voluptas quibusdam.
					</ETASimpleText>
				</InfoContainer>
			</ETAAutoScroll>
		</Root>
	)
}

export default React.memo(SubHeadAboutUsComponent)
