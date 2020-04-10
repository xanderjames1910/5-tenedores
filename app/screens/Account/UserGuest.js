import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';

import { withNavigation } from 'react-navigation';

const UserGuest = (props) => {
	// Props destructuring
	const { navigation } = props;

	// Styles destructuring
	const {
		btnStyle,
		btnContainer,
		description,
		image,
		title,
		viewBody,
		viewBtn,
	} = styles;

	return (
		<ScrollView style={viewBody} centerContent={true}>
			<Image
				source={require('../../../assets/img/image-guest.jpg')}
				style={image}
				resizeMode='contain'
			/>
			<Text style={title}>Consulta tu perfil de 5 Tenedores</Text>
			<Text style={description}>
				¿Cómo describirías tu mejor restaurante? Busca y visualiza los
				mejores restaurantes de una forma sencilla, vota cúal te ha gustado
				más y comenta cómo ha sido tu experiencia.
			</Text>
			<View style={viewBtn}>
				<Button
					buttonStyle={btnStyle}
					containerStyle={btnContainer}
					title='Ver tu perfil'
					onPress={() => navigation.navigate('Login')}
				/>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	viewBody: {
		marginHorizontal: 30,
	},
	image: {
		height: 300,
		width: '100%',
		marginBottom: 40,
	},
	title: {
		fontWeight: 'bold',
		fontSize: 19,
		marginBottom: 10,
		textAlign: 'center',
	},
	description: {
		textAlign: 'center',
		marginBottom: 20,
	},
	viewBtn: {
		flex: 1,
		alignItems: 'center',
	},
	btnStyle: {
		backgroundColor: '#00a680',
	},
	btnContainer: {
		width: '70%',
	},
});

export default withNavigation(UserGuest);
