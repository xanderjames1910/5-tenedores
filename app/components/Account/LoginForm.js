import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Icon, Input } from 'react-native-elements';
import * as firebase from 'firebase';
import { withNavigation } from 'react-navigation';

import { validateEmail } from '../../utils/Validation';
import Loading from '../Loading';

const LoginForm = (props) => {
	// Props destructuring
	const { navigation, toastRef } = props;

	// Component state
	const [isVisibleLoading, setIsVisibleLoading] = useState(false);
	const [hidePassword, setHidePassword] = useState(true);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	// Styles destructuring
	const {
		btnContainerLogin,
		btnLogin,
		formContainer,
		iconRight,
		inputForm,
	} = styles;

	// Component functions
	const login = async () => {
		// Loading validando e iniciando sesión
		setIsVisibleLoading(true);

		if (!email || !password) {
			toastRef.current.show('Todos los campos son obligatorios', 1500);
		} else {
			if (!validateEmail(email)) {
				toastRef.current.show('El email debe ser válido', 1500);
			} else {
				await firebase
					.auth()
					.signInWithEmailAndPassword(email, password)
					.then(() => {
						navigation.navigate('Account');
					})
					.catch(() => {
						toastRef.current.show(
							'Email o contraseña incorrectos. Inténtalo nuevamente',
							1500,
						);
					});
			}
		}

		// Loading Validación/inicio de sesión completa
		setIsVisibleLoading(false);
	};

	return (
		<View style={formContainer}>
			<Input
				placeholder='Correo electrónico'
				autoCapitalize='none'
				keyboardType='email-address'
				containerStyle={inputForm}
				onChange={(e) => setEmail(e.nativeEvent.text)}
				rightIcon={
					<Icon
						type='material-community'
						name='at'
						iconStyle={iconRight}
					/>
				}
			/>

			<Input
				placeholder='Contraseña'
				autoCapitalize='none'
				password={true}
				secureTextEntry={hidePassword}
				containerStyle={inputForm}
				onChange={(e) => setPassword(e.nativeEvent.text)}
				rightIcon={
					<Icon
						type='material-community'
						name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
						iconStyle={iconRight}
						onPress={() => setHidePassword(!hidePassword)}
					/>
				}
			/>

			<Button
				title='Iniciar Sesión'
				containerStyle={btnContainerLogin}
				buttonStyle={btnLogin}
				onPress={login}
			/>
			<Loading isVisible={isVisibleLoading} text='Iniciando sesión' />
		</View>
	);
};

const styles = StyleSheet.create({
	formContainer: {
		flex: 1,
		marginTop: 30,
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputForm: {
		width: '100%',
		marginTop: 20,
	},
	iconRight: {
		color: '#c1c1c1',
	},
	btnContainerLogin: {
		marginTop: 20,
		width: '95%',
	},
	btnLogin: {
		backgroundColor: '#00a680',
	},
});

export default withNavigation(LoginForm);
