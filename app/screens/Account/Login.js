import React, { useRef } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Divider } from 'react-native-elements';
import Toast from 'react-native-easy-toast';

import LoginForm from '../../components/Account/LoginForm';
import LoginFacebook from '../../components/Account/LoginFacebook';

const Login = (props) => {
	// Props destructuring
	const { navigation } = props;

	// Styles destructuring
	const { divider, logo, viewContainer } = styles;

	const toastRef = useRef();

	return (
		<ScrollView>
			<Image
				source={require('../../../assets/img/logo.png')}
				style={logo}
				resizeMode='contain'
			/>
			<View style={viewContainer}>
				<LoginForm toastRef={toastRef} />
				<CreateAccount navigation={navigation} />
			</View>
			<Divider style={divider} />
			<View style={viewContainer}>
				<LoginFacebook toastRef={toastRef} navigation={navigation} />
			</View>
			<Toast ref={toastRef} position='center' opacity={0.5} />
		</ScrollView>
	);
};

const CreateAccount = (props) => {
	// Props destructuring
	const { navigation } = props;

	// Styles destructuring
	const { btnRegister, textRegister } = styles;

	return (
		<Text style={textRegister}>
			¿Aún no tienes una cuenta?{' '}
			<Text
				style={btnRegister}
				onPress={() => navigation.navigate('Register')}>
				Regístrate
			</Text>
		</Text>
	);
};

const styles = StyleSheet.create({
	logo: {
		width: '100%',
		height: 150,
		marginTop: 20,
	},
	viewContainer: {
		marginHorizontal: 40,
	},
	textRegister: {
		marginTop: 15,
		marginHorizontal: 10,
	},
	btnRegister: {
		color: '#00a680',
		fontWeight: 'bold',
	},
	divider: {
		backgroundColor: '#00a680',
		margin: 40,
	},
});

export default Login;
