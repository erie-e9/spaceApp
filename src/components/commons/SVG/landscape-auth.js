import React from 'react'
// import styled from 'styled-components/native';
// import {SvgXml} from 'react-native-svg';
// import testSvg from './landscape-iceCream.svg';
// export default () => <SvgXml width='200' height='200' xml={testSvg} />;
import Svg, {
	// Circle,
	// Ellipse,
	G,
	// Text,
	// TSpan,
	// TextPath,
	Path,
	// Polygon,
	// Polyline,
	// Line,
	// Rect,
	Use,
	Image,
	// Symbol,
	Defs,
	// LinearGradient,
	// RadialGradient,
	// Stop,
	// ClipPath,
	Pattern,
	// Mask,
	// Marker,
} from 'react-native-svg'

// const Root = styled.View``;

const LandscapeAuth = ({children}) => (
	<>
		<Svg viewBox='0 0 420.1 800.2'>
			{children}
			<Defs>
				<Pattern
					id='pattern'
					width='100%'
					height='100%'
					preserveAspectRatio='none'
					viewBox='0 0 192 192'>
					<Image width='192' height='192' />
				</Pattern>
				<Image id='image' width='26' height='26' />
				<Image id='image-2' width='63' height='63' />
			</Defs>
			<G data-name='Grupo 25' transform='translate(6.1)'>
				<Path
					fill='#f5f5f5'
					d='M0 0H414V736H0z'
					data-name='Rectángulo 4'
				/>
				<Use opacity='0.67' transform='translate(235 589)' />
				<Path
					fill='#f5b7ce'
					d='M343.613 767.948s-49.466-128.755-112.457-157.009-143.648 23.05-143.648 23.05L72.4 646.876l22.662 121.072z'
					data-name='Trazado 4'
					transform='translate(-15.1 -31.947)'
				/>
				<Path
					fill='#ff5a99'
					d='M421 255.5c-117 80.533-123.947 141.908-123.947 141.908l-14 43.249S251 463.831 248.2 471.517 225.9 550.1 225.9 550.1H421z'
					data-name='Trazado 1'
					transform='translate(-7 186.2)'
				/>
				<Path
					fill='#ff5a99'
					d='M130.419 742.241c12.03 1.319-7.626-54.086-38.454-92.85s-41.891-48.4-41.891-48.4-9.345-20.194-35.017-42.011S-19.1 533.1-19.1 533.1l5.156 213.2s132.333-5.378 144.363-4.059z'
					data-name='Trazado 2'
					transform='translate(13 -4.1)'
				/>
				<G
					fill='none'
					stroke='#f54f8e'
					data-name='Grupo 20'
					transform='translate(1 233)'>
					<G data-name='Grupo 19'>
						<Path
							strokeWidth='3'
							d='M0 71.6L0 0'
							data-name='Línea 1'
							transform='translate(27.5 435.9)'
						/>
						<Path
							strokeWidth='4'
							d='M0 9.206L14 0'
							data-name='Línea 2'
							transform='translate(14.5 435.9)'
						/>
						<Path
							strokeWidth='4'
							d='M0 9.206L14 0'
							data-name='Línea 3'
							transform='translate(14.5 446.129)'
						/>
						<Path
							strokeWidth='4'
							d='M0 9.206L14 0'
							data-name='Línea 4'
							transform='translate(14.5 456.357)'
						/>
						<Path
							strokeWidth='4'
							d='M0 9.206L14 0'
							data-name='Línea 5'
							transform='translate(14.5 466.586)'
						/>
						<Path
							strokeWidth='4'
							d='M0 9.206L14 0'
							data-name='Línea 6'
							transform='translate(14.5 476.814)'
						/>
						<Path
							strokeWidth='4'
							d='M0 9.206L14 0'
							data-name='Línea 7'
							transform='translate(14.5 487.043)'
						/>
						<Path
							strokeWidth='3'
							d='M0 71.6L0 0'
							data-name='Línea 1'
							transform='translate(27.5 435.9)'
						/>
						<Path
							strokeWidth='4'
							d='M14 9.206L0 0'
							data-name='Línea 2'
							transform='translate(26.5 435.9)'
						/>
						<Path
							strokeWidth='4'
							d='M14 9.206L0 0'
							data-name='Línea 3'
							transform='translate(26.5 446.129)'
						/>
						<Path
							strokeWidth='4'
							d='M14 9.206L0 0'
							data-name='Línea 4'
							transform='translate(26.5 456.357)'
						/>
						<Path
							strokeWidth='4'
							d='M14 9.206L0 0'
							data-name='Línea 5'
							transform='translate(26.5 466.586)'
						/>
						<Path
							strokeWidth='4'
							d='M14 9.206L0 0'
							data-name='Línea 6'
							transform='translate(26.5 476.814)'
						/>
						<Path
							strokeWidth='4'
							d='M14 9.206L0 0'
							data-name='Línea 7'
							transform='translate(26.5 487.043)'
						/>
					</G>
					<G data-name='Grupo 18'>
						<Path
							strokeWidth='3'
							d='M0 71.6L0 0'
							data-name='Línea 1'
							transform='translate(67.5 435.9)'
						/>
						<Path
							strokeWidth='4'
							d='M0 9.206L14 0'
							data-name='Línea 2'
							transform='translate(54.5 435.9)'
						/>
						<Path
							strokeWidth='4'
							d='M0 9.206L14 0'
							data-name='Línea 3'
							transform='translate(54.5 446.129)'
						/>
						<Path
							strokeWidth='4'
							d='M0 9.206L14 0'
							data-name='Línea 4'
							transform='translate(54.5 456.357)'
						/>
						<Path
							strokeWidth='4'
							d='M0 9.206L14 0'
							data-name='Línea 5'
							transform='translate(54.5 466.586)'
						/>
						<Path
							strokeWidth='4'
							d='M0 9.206L14 0'
							data-name='Línea 6'
							transform='translate(54.5 476.814)'
						/>
						<Path
							strokeWidth='4'
							d='M0 9.206L14 0'
							data-name='Línea 7'
							transform='translate(54.5 487.043)'
						/>
						<Path
							strokeWidth='3'
							d='M0 71.6L0 0'
							data-name='Línea 1'
							transform='translate(67.5 435.9)'
						/>
						<Path
							strokeWidth='4'
							d='M14 9.206L0 0'
							data-name='Línea 2'
							transform='translate(66.5 435.9)'
						/>
						<Path
							strokeWidth='4'
							d='M14 9.206L0 0'
							data-name='Línea 3'
							transform='translate(66.5 446.129)'
						/>
						<Path
							strokeWidth='4'
							d='M14 9.206L0 0'
							data-name='Línea 4'
							transform='translate(66.5 456.357)'
						/>
						<Path
							strokeWidth='4'
							d='M14 9.206L0 0'
							data-name='Línea 5'
							transform='translate(66.5 466.586)'
						/>
						<Path
							strokeWidth='4'
							d='M14 9.206L0 0'
							data-name='Línea 6'
							transform='translate(66.5 476.814)'
						/>
						<Path
							strokeWidth='4'
							d='M14 9.206L0 0'
							data-name='Línea 7'
							transform='translate(66.5 487.043)'
						/>
					</G>
					<G data-name='Grupo 17'>
						<Path
							strokeWidth='3'
							d='M0 71.6L0 0'
							data-name='Línea 1'
							transform='translate(107.5 435.9)'
						/>
						<Path
							strokeWidth='4'
							d='M0 9.206L14 0'
							data-name='Línea 2'
							transform='translate(94.5 435.9)'
						/>
						<Path
							strokeWidth='4'
							d='M0 9.206L14 0'
							data-name='Línea 3'
							transform='translate(94.5 446.129)'
						/>
						<Path
							strokeWidth='4'
							d='M0 9.206L14 0'
							data-name='Línea 4'
							transform='translate(94.5 456.357)'
						/>
						<Path
							strokeWidth='4'
							d='M0 9.206L14 0'
							data-name='Línea 5'
							transform='translate(94.5 466.586)'
						/>
						<Path
							strokeWidth='4'
							d='M0 9.206L14 0'
							data-name='Línea 6'
							transform='translate(94.5 476.814)'
						/>
						<Path
							strokeWidth='4'
							d='M0 9.206L14 0'
							data-name='Línea 7'
							transform='translate(94.5 487.043)'
						/>
						<Path
							strokeWidth='3'
							d='M0 71.6L0 0'
							data-name='Línea 1'
							transform='translate(107.5 435.9)'
						/>
						<Path
							strokeWidth='4'
							d='M14 9.206L0 0'
							data-name='Línea 2'
							transform='translate(106.5 435.9)'
						/>
						<Path
							strokeWidth='4'
							d='M14 9.206L0 0'
							data-name='Línea 3'
							transform='translate(106.5 446.129)'
						/>
						<Path
							strokeWidth='4'
							d='M14 9.206L0 0'
							data-name='Línea 4'
							transform='translate(106.5 456.357)'
						/>
						<Path
							strokeWidth='4'
							d='M14 9.206L0 0'
							data-name='Línea 5'
							transform='translate(106.5 466.586)'
						/>
						<Path
							strokeWidth='4'
							d='M14 9.206L0 0'
							data-name='Línea 6'
							transform='translate(106.5 476.814)'
						/>
						<Path
							strokeWidth='4'
							d='M14 9.206L0 0'
							data-name='Línea 7'
							transform='translate(106.5 487.043)'
						/>
					</G>
					<G data-name='Grupo 16'>
						<Path
							strokeWidth='3'
							d='M0 71.6L0 0'
							data-name='Línea 1'
							transform='translate(147.5 435.9)'
						/>
						<Path
							strokeWidth='4'
							d='M0 9.206L14 0'
							data-name='Línea 2'
							transform='translate(134.5 435.9)'
						/>
						<Path
							strokeWidth='4'
							d='M0 9.206L14 0'
							data-name='Línea 3'
							transform='translate(134.5 446.129)'
						/>
						<Path
							strokeWidth='4'
							d='M0 9.206L14 0'
							data-name='Línea 4'
							transform='translate(134.5 456.357)'
						/>
						<Path
							strokeWidth='4'
							d='M0 9.206L14 0'
							data-name='Línea 5'
							transform='translate(134.5 466.586)'
						/>
						<Path
							strokeWidth='4'
							d='M0 9.206L14 0'
							data-name='Línea 6'
							transform='translate(134.5 476.814)'
						/>
						<Path
							strokeWidth='4'
							d='M0 9.206L14 0'
							data-name='Línea 7'
							transform='translate(134.5 487.043)'
						/>
						<Path
							strokeWidth='3'
							d='M0 71.6L0 0'
							data-name='Línea 1'
							transform='translate(147.5 435.9)'
						/>
						<Path
							strokeWidth='4'
							d='M14 9.206L0 0'
							data-name='Línea 2'
							transform='translate(146.5 435.9)'
						/>
						<Path
							strokeWidth='4'
							d='M14 9.206L0 0'
							data-name='Línea 3'
							transform='translate(146.5 446.129)'
						/>
						<Path
							strokeWidth='4'
							d='M14 9.206L0 0'
							data-name='Línea 4'
							transform='translate(146.5 456.357)'
						/>
						<Path
							strokeWidth='4'
							d='M14 9.206L0 0'
							data-name='Línea 5'
							transform='translate(146.5 466.586)'
						/>
						<Path
							strokeWidth='4'
							d='M14 9.206L0 0'
							data-name='Línea 6'
							transform='translate(146.5 476.814)'
						/>
						<Path
							strokeWidth='4'
							d='M14 9.206L0 0'
							data-name='Línea 7'
							transform='translate(146.5 487.043)'
						/>
					</G>
					<G data-name='Grupo 15'>
						<Path
							strokeWidth='3'
							d='M0 71.6L0 0'
							data-name='Línea 1'
							transform='translate(187.5 435.9)'
						/>
						<Path
							strokeWidth='4'
							d='M0 9.206L14 0'
							data-name='Línea 2'
							transform='translate(174.5 435.9)'
						/>
						<Path
							strokeWidth='4'
							d='M0 9.206L14 0'
							data-name='Línea 3'
							transform='translate(174.5 446.129)'
						/>
						<Path
							strokeWidth='4'
							d='M0 9.206L14 0'
							data-name='Línea 4'
							transform='translate(174.5 456.357)'
						/>
						<Path
							strokeWidth='4'
							d='M0 9.206L14 0'
							data-name='Línea 5'
							transform='translate(174.5 466.586)'
						/>
						<Path
							strokeWidth='4'
							d='M0 9.206L14 0'
							data-name='Línea 6'
							transform='translate(174.5 476.814)'
						/>
						<Path
							strokeWidth='4'
							d='M0 9.206L14 0'
							data-name='Línea 7'
							transform='translate(174.5 487.043)'
						/>
						<Path
							strokeWidth='3'
							d='M0 71.6L0 0'
							data-name='Línea 1'
							transform='translate(187.5 435.9)'
						/>
						<Path
							strokeWidth='4'
							d='M14 9.206L0 0'
							data-name='Línea 2'
							transform='translate(186.5 435.9)'
						/>
						<Path
							strokeWidth='4'
							d='M14 9.206L0 0'
							data-name='Línea 3'
							transform='translate(186.5 446.129)'
						/>
						<Path
							strokeWidth='4'
							d='M14 9.206L0 0'
							data-name='Línea 4'
							transform='translate(186.5 456.357)'
						/>
						<Path
							strokeWidth='4'
							d='M14 9.206L0 0'
							data-name='Línea 5'
							transform='translate(186.5 466.586)'
						/>
						<Path
							strokeWidth='4'
							d='M14 9.206L0 0'
							data-name='Línea 6'
							transform='translate(186.5 476.814)'
						/>
						<Path
							strokeWidth='4'
							d='M14 9.206L0 0'
							data-name='Línea 7'
							transform='translate(186.5 487.043)'
						/>
					</G>
					<G data-name='Grupo 14'>
						<Path
							strokeWidth='3'
							d='M0 71.6L0 0'
							data-name='Línea 1'
							transform='translate(227.5 435.9)'
						/>
						<Path
							strokeWidth='4'
							d='M0 9.206L14 0'
							data-name='Línea 2'
							transform='translate(214.5 435.9)'
						/>
						<Path
							strokeWidth='4'
							d='M0 9.206L14 0'
							data-name='Línea 3'
							transform='translate(214.5 446.129)'
						/>
						<Path
							strokeWidth='4'
							d='M0 9.206L14 0'
							data-name='Línea 4'
							transform='translate(214.5 456.357)'
						/>
						<Path
							strokeWidth='4'
							d='M0 9.206L14 0'
							data-name='Línea 5'
							transform='translate(214.5 466.586)'
						/>
						<Path
							strokeWidth='4'
							d='M0 9.206L14 0'
							data-name='Línea 6'
							transform='translate(214.5 476.814)'
						/>
						<Path
							strokeWidth='4'
							d='M0 9.206L14 0'
							data-name='Línea 7'
							transform='translate(214.5 487.043)'
						/>
						<Path
							strokeWidth='3'
							d='M0 71.6L0 0'
							data-name='Línea 1'
							transform='translate(227.5 435.9)'
						/>
						<Path
							strokeWidth='4'
							d='M14 9.206L0 0'
							data-name='Línea 2'
							transform='translate(226.5 435.9)'
						/>
						<Path
							strokeWidth='4'
							d='M14 9.206L0 0'
							data-name='Línea 3'
							transform='translate(226.5 446.129)'
						/>
						<Path
							strokeWidth='4'
							d='M14 9.206L0 0'
							data-name='Línea 4'
							transform='translate(226.5 456.357)'
						/>
						<Path
							strokeWidth='4'
							d='M14 9.206L0 0'
							data-name='Línea 5'
							transform='translate(226.5 466.586)'
						/>
						<Path
							strokeWidth='4'
							d='M14 9.206L0 0'
							data-name='Línea 6'
							transform='translate(226.5 476.814)'
						/>
						<Path
							strokeWidth='4'
							d='M14 9.206L0 0'
							data-name='Línea 7'
							transform='translate(226.5 487.043)'
						/>
					</G>
					<G data-name='Grupo 13'>
						<Path
							strokeWidth='3'
							d='M0 71.6L0 0'
							data-name='Línea 1'
							transform='translate(267.5 435.9)'
						/>
						<Path
							strokeWidth='4'
							d='M0 9.206L14 0'
							data-name='Línea 2'
							transform='translate(254.5 435.9)'
						/>
						<Path
							strokeWidth='4'
							d='M0 9.206L14 0'
							data-name='Línea 3'
							transform='translate(254.5 446.129)'
						/>
						<Path
							strokeWidth='4'
							d='M0 9.206L14 0'
							data-name='Línea 4'
							transform='translate(254.5 456.357)'
						/>
						<Path
							strokeWidth='4'
							d='M0 9.206L14 0'
							data-name='Línea 5'
							transform='translate(254.5 466.586)'
						/>
						<Path
							strokeWidth='4'
							d='M0 9.206L14 0'
							data-name='Línea 6'
							transform='translate(254.5 476.814)'
						/>
						<Path
							strokeWidth='4'
							d='M0 9.206L14 0'
							data-name='Línea 7'
							transform='translate(254.5 487.043)'
						/>
						<Path
							strokeWidth='3'
							d='M0 71.6L0 0'
							data-name='Línea 1'
							transform='translate(267.5 435.9)'
						/>
						<Path
							strokeWidth='4'
							d='M14 9.206L0 0'
							data-name='Línea 2'
							transform='translate(266.5 435.9)'
						/>
						<Path
							strokeWidth='4'
							d='M14 9.206L0 0'
							data-name='Línea 3'
							transform='translate(266.5 446.129)'
						/>
						<Path
							strokeWidth='4'
							d='M14 9.206L0 0'
							data-name='Línea 4'
							transform='translate(266.5 456.357)'
						/>
						<Path
							strokeWidth='4'
							d='M14 9.206L0 0'
							data-name='Línea 5'
							transform='translate(266.5 466.586)'
						/>
						<Path
							strokeWidth='4'
							d='M14 9.206L0 0'
							data-name='Línea 6'
							transform='translate(266.5 476.814)'
						/>
						<Path
							strokeWidth='4'
							d='M14 9.206L0 0'
							data-name='Línea 7'
							transform='translate(266.5 487.043)'
						/>
					</G>
					<G data-name='Grupo 12'>
						<Path
							strokeWidth='3'
							d='M0 71.6L0 0'
							data-name='Línea 1'
							transform='translate(307.5 435.9)'
						/>
						<Path
							strokeWidth='4'
							d='M0 9.206L14 0'
							data-name='Línea 2'
							transform='translate(294.5 435.9)'
						/>
						<Path
							strokeWidth='4'
							d='M0 9.206L14 0'
							data-name='Línea 3'
							transform='translate(294.5 446.129)'
						/>
						<Path
							strokeWidth='4'
							d='M0 9.206L14 0'
							data-name='Línea 4'
							transform='translate(294.5 456.357)'
						/>
						<Path
							strokeWidth='4'
							d='M0 9.206L14 0'
							data-name='Línea 5'
							transform='translate(294.5 466.586)'
						/>
						<Path
							strokeWidth='4'
							d='M0 9.206L14 0'
							data-name='Línea 6'
							transform='translate(294.5 476.814)'
						/>
						<Path
							strokeWidth='4'
							d='M0 9.206L14 0'
							data-name='Línea 7'
							transform='translate(294.5 487.043)'
						/>
						<Path
							strokeWidth='3'
							d='M0 71.6L0 0'
							data-name='Línea 1'
							transform='translate(307.5 435.9)'
						/>
						<Path
							strokeWidth='4'
							d='M14 9.206L0 0'
							data-name='Línea 2'
							transform='translate(306.5 435.9)'
						/>
						<Path
							strokeWidth='4'
							d='M14 9.206L0 0'
							data-name='Línea 3'
							transform='translate(306.5 446.129)'
						/>
						<Path
							strokeWidth='4'
							d='M14 9.206L0 0'
							data-name='Línea 4'
							transform='translate(306.5 456.357)'
						/>
						<Path
							strokeWidth='4'
							d='M14 9.206L0 0'
							data-name='Línea 5'
							transform='translate(306.5 466.586)'
						/>
						<Path
							strokeWidth='4'
							d='M14 9.206L0 0'
							data-name='Línea 6'
							transform='translate(306.5 476.814)'
						/>
						<Path
							strokeWidth='4'
							d='M14 9.206L0 0'
							data-name='Línea 7'
							transform='translate(306.5 487.043)'
						/>
					</G>
					<G data-name='Grupo 11'>
						<Path
							strokeWidth='3'
							d='M0 71.6L0 0'
							data-name='Línea 1'
							transform='translate(347.5 435.9)'
						/>
						<Path
							strokeWidth='4'
							d='M0 9.206L14 0'
							data-name='Línea 2'
							transform='translate(334.5 435.9)'
						/>
						<Path
							strokeWidth='4'
							d='M0 9.206L14 0'
							data-name='Línea 3'
							transform='translate(334.5 446.129)'
						/>
						<Path
							strokeWidth='4'
							d='M0 9.206L14 0'
							data-name='Línea 4'
							transform='translate(334.5 456.357)'
						/>
						<Path
							strokeWidth='4'
							d='M0 9.206L14 0'
							data-name='Línea 5'
							transform='translate(334.5 466.586)'
						/>
						<Path
							strokeWidth='4'
							d='M0 9.206L14 0'
							data-name='Línea 6'
							transform='translate(334.5 476.814)'
						/>
						<Path
							strokeWidth='4'
							d='M0 9.206L14 0'
							data-name='Línea 7'
							transform='translate(334.5 487.043)'
						/>
						<Path
							strokeWidth='3'
							d='M0 71.6L0 0'
							data-name='Línea 1'
							transform='translate(347.5 435.9)'
						/>
						<Path
							strokeWidth='4'
							d='M14 9.206L0 0'
							data-name='Línea 2'
							transform='translate(346.5 435.9)'
						/>
						<Path
							strokeWidth='4'
							d='M14 9.206L0 0'
							data-name='Línea 3'
							transform='translate(346.5 446.129)'
						/>
						<Path
							strokeWidth='4'
							d='M14 9.206L0 0'
							data-name='Línea 4'
							transform='translate(346.5 456.357)'
						/>
						<Path
							strokeWidth='4'
							d='M14 9.206L0 0'
							data-name='Línea 5'
							transform='translate(346.5 466.586)'
						/>
						<Path
							strokeWidth='4'
							d='M14 9.206L0 0'
							data-name='Línea 6'
							transform='translate(346.5 476.814)'
						/>
						<Path
							strokeWidth='4'
							d='M14 9.206L0 0'
							data-name='Línea 7'
							transform='translate(346.5 487.043)'
						/>
					</G>
					<G data-name='Grupo 10'>
						<Path
							strokeWidth='3'
							d='M0 71.6L0 0'
							data-name='Línea 1'
							transform='translate(387.5 435.9)'
						/>
						<Path
							strokeWidth='4'
							d='M0 9.206L14 0'
							data-name='Línea 2'
							transform='translate(374.5 435.9)'
						/>
						<Path
							strokeWidth='4'
							d='M0 9.206L14 0'
							data-name='Línea 3'
							transform='translate(374.5 446.129)'
						/>
						<Path
							strokeWidth='4'
							d='M0 9.206L14 0'
							data-name='Línea 4'
							transform='translate(374.5 456.357)'
						/>
						<Path
							strokeWidth='4'
							d='M0 9.206L14 0'
							data-name='Línea 5'
							transform='translate(374.5 466.586)'
						/>
						<Path
							strokeWidth='4'
							d='M0 9.206L14 0'
							data-name='Línea 6'
							transform='translate(374.5 476.814)'
						/>
						<Path
							strokeWidth='4'
							d='M0 9.206L14 0'
							data-name='Línea 7'
							transform='translate(374.5 487.043)'
						/>
						<Path
							strokeWidth='3'
							d='M0 71.6L0 0'
							data-name='Línea 1'
							transform='translate(387.5 435.9)'
						/>
						<Path
							strokeWidth='4'
							d='M14 9.206L0 0'
							data-name='Línea 2'
							transform='translate(386.5 435.9)'
						/>
						<Path
							strokeWidth='4'
							d='M14 9.206L0 0'
							data-name='Línea 3'
							transform='translate(386.5 446.129)'
						/>
						<Path
							strokeWidth='4'
							d='M14 9.206L0 0'
							data-name='Línea 4'
							transform='translate(386.5 456.357)'
						/>
						<Path
							strokeWidth='4'
							d='M14 9.206L0 0'
							data-name='Línea 5'
							transform='translate(386.5 466.586)'
						/>
						<Path
							strokeWidth='4'
							d='M14 9.206L0 0'
							data-name='Línea 6'
							transform='translate(386.5 476.814)'
						/>
						<Path
							strokeWidth='4'
							d='M14 9.206L0 0'
							data-name='Línea 7'
							transform='translate(386.5 487.043)'
						/>
					</G>
				</G>
				<Image
					width='56'
					height='56'
					transform='translate(133 543)'
				/>
				<Use
					data-name='cloudpink1'
					opacity='0.67'
					transform='matrix(2 0 0 2 5 494)'
				/>
				<Use transform='translate(307 502)' />
				<Use
					data-name='cloudwhite1'
					transform='matrix(.524 0 0 .524 33 501)'
				/>
				<Path
					fill='url(#pattern)'
					d='M0 0H68V69H0z'
					opacity='0.32'
					transform='translate(239 460)'
				/>
				<Image
					width='24'
					height='24'
					data-name='cloudspink1'
					opacity='0.15'
					transform='translate(105 496)'
				/>
			</G>
		</Svg>
	</>
)

export default LandscapeAuth
