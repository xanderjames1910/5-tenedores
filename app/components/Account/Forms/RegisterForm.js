import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Input, Icon } from 'react-native-elements';
import * as firebase from 'firebase';
import { withNavigation } from 'react-navigation';

import { validateEmail } from '../../../utils/Validation';
import Loading from '../../Loading';

const RegisterForm = (props) => {
	// Props destructuring
	const { navigation, toastRef } = props;

	// Component State
	const [hidePassword, setHidePassword] = useState(true);
	const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
	const [isVisibleLoading, setIsVisibleLoading] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	// Styles destructuring
	const {
		btnContainerStyle,
		btnRegister,
		formContainer,
		iconRight,
		inputForm,
	} = styles;

	// Component functions
	const register = async () => {
		// Loading validando y creando usuario
		setIsVisibleLoading(true);

		if (!email || !password || !confirmPassword) {
			toastRef.current.show('Todos los campos son obligatorios', 1500);
		} else {
			if (!validateEmail(email)) {
				toastRef.current.show('El email debe ser válido', 1500);
			} else {
				if (password !== confirmPassword) {
					toastRef.current.show('Las contraseñas no coinciden', 1500);
				} else {
					await firebase
						.auth()
						.createUserWithEmailAndPassword(email, password)
						.then(() => {
							navigation.navigate('Account');
						})
						.catch(() => {
							toastRef.current.show(
								'Error al crear la cuenta inténtelo más tarde',
								1500,
							);
						});
				}
			}
		}

		// Loading Validación/creación de usuario completa
		setIsVisibleLoading(false);
	};

	return (
		<View style={formContainer}>
			<Input
				placeholder='Correo electrónico'
				containerStyle={inputForm}
				autoCapitalize='none'
				keyboardType='email-address'
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
				password={true}
				secureTextEntry={hidePassword}
				containerStyle={inputForm}
				autoCapitalize='none'
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

			<Input
				placeholder='Confirmar Contraseña'
				password={true}
				secureTextEntry={hideConfirmPassword}
				containerStyle={inputForm}
				autoCapitalize='none'
				onChange={(e) => setConfirmPassword(e.nativeEvent.text)}
				rightIcon={
					<Icon
						type='material-community'
						name={hideConfirmPassword ? 'eye-outline' : 'eye-off-outline'}
						iconStyle={iconRight}
						onPress={() => setHideConfirmPassword(!hideConfirmPassword)}
					/>
				}
			/>

			<Button
				title='Registrarme'
				containerStyle={btnContainerStyle}
				buttonStyle={btnRegister}
				onPress={register}
			/>
			<Loading isVisible={isVisibleLoading} text='Creando cuenta' />
		</View>
	);
};

const styles = StyleSheet.create({
	formContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 30,
	},
	inputForm: {
		width: '100%',
		marginTop: 20,
	},
	iconRight: {
		color: '#c1c1c1',
	},
	btnContainerStyle: {
		marginTop: 20,
		width: '95%',
	},
	btnRegister: {
		backgroundColor: '#00a680',
	},
});

export default withNavigation(RegisterForm);
