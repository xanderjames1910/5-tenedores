import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import * as firebase from 'firebase';

import { reauthenticate } from '../../../utils/Api';

const ChangeEmailForm = (props) => {
	// Component State
	const [newEmail, setNewEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [hidePassword, setHidePassword] = useState(true);

	// Props destructiuring
	const { email, setIsVisibleModal, setReloadData, toastRef } = props;

	// Styles destructuring
	const { btn, btnContainer, input, view } = styles;

	// Component functions
	const updateEmail = () => {
		setError({});

		if (!newEmail || email === newEmail) {
			setError({ email: 'El email no puede ser igual o estar vacio' });
		} else {
			setIsLoading(true);

			reauthenticate(password)
				.then(() => {
					firebase
						.auth()
						.currentUser.updateEmail(newEmail)
						.then(() => {
							setIsLoading(false);
							setReloadData(true);
							toastRef.current.show(
								'Email actualizado correctamente',
								1500,
							);
							setIsVisibleModal(false);
						})
						.catch(() => {
							setError({ email: 'Error al actualizar el email' });
							setIsLoading(false);
						});
				})
				.catch(() => {
					setError({ password: 'La contraseñ no es correcta' });
					setIsLoading(false);
				});
		}
	};

	return (
		<View style={view}>
			<Input
				placeholder='Correo Electrónico'
				autoCapitalize='none'
				containerStyle={input}
				defaultValue={email && email}
				onChange={(e) => setNewEmail(e.nativeEvent.text)}
				rightIcon={{
					type: 'material-community',
					name: 'at',
					color: '#c2c2c2',
				}}
				errorMessage={error.email}
			/>
			<Input
				placeholder='Contraseña'
				autoCapitalize='none'
				containerStyle={input}
				password={true}
				secureTextEntry={hidePassword}
				onChange={(e) => setPassword(e.nativeEvent.text)}
				rightIcon={{
					type: 'material-community',
					name: hidePassword ? 'eye-outline' : 'eye-off-outline',
					color: '#c2c2c2',
					onPress: () => setHidePassword(!hidePassword),
				}}
				errorMessage={error.password}
			/>
			<Button
				title='Cambiar email'
				disabled={isLoading}
				disabledStyle={btn}
				containerStyle={btnContainer}
				buttonStyle={btn}
				onPress={updateEmail}
				loading={isLoading}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	view: {
		alignItems: 'center',
		paddingVertical: 10,
	},
	input: {
		marginVertical: 10,
	},
	btnContainer: {
		marginTop: 20,
		width: '95%',
	},
	btn: {
		backgroundColor: '#00a680',
	},
});

export default ChangeEmailForm;
