import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, Input } from 'react-native-elements';
import * as firebase from 'firebase';

import { reauthenticate } from '../../../utils/Api';

const ChangePasswordForm = (props) => {
	// Component State
	const [password, setPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmNewPassword, setConfirmNewPassword] = useState('');
	const [error, setError] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [hidePassword, setHidePassword] = useState(true);
	const [hideNewPassword, setHideNewPassword] = useState(true);
	const [hideConfirmNewPassword, setHideConfirmNewPassword] = useState(true);

	// Props destructiuring
	const { setIsVisibleModal, toastRef } = props;

	// Styles destructuring
	const { btn, btnContainer, input, view } = styles;

	// Component functions
	const updatePassword = () => {
		setError({});

		if (!password || !newPassword || !confirmNewPassword) {
			let objError = {};
			!password && (objError.password = 'No puede estar vacío.');
			!newPassword && (objError.newPassword = 'No puede estar vacío.');
			!confirmNewPassword &&
				(objError.confirmNewPassword = 'No puede estar vacío.');

			setError(objError);
		} else {
			if (newPassword !== confirmNewPassword) {
				setError({
					newPassword: 'Las nuevas contraseñas deben coincidir.',
					confirmNewPassword: 'Las nuevas contraseñas deben coincidir.',
				});
			} else {
				setIsLoading(true);

				reauthenticate(password)
					.then(() => {
						firebase
							.auth()
							.currentUser.updatePassword(newPassword)
							.then(() => {
								setIsLoading(false);
								toastRef.current.show(
									'Contraseña actualizada correctamente',
									1500,
								);
								setIsVisibleModal(false);
								// firebase.auth().signOut();
							})
							.catch(() => {
								setError({
									general: 'Error al actualizar la contraseña.',
								});
								setIsLoading(false);
							});
					})
					.catch(() => {
						setError({ password: 'La contraseña no es correcta.' });
						setIsLoading(false);
					});
			}
		}
	};

	return (
		<View style={view}>
			<Input
				placeholder='Contraseña actual'
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

			<Input
				placeholder='Nueva contraseña'
				autoCapitalize='none'
				containerStyle={input}
				password={true}
				secureTextEntry={hideNewPassword}
				onChange={(e) => setNewPassword(e.nativeEvent.text)}
				rightIcon={{
					type: 'material-community',
					name: hideNewPassword ? 'eye-outline' : 'eye-off-outline',
					color: '#c2c2c2',
					onPress: () => setHideNewPassword(!hideNewPassword),
				}}
				errorMessage={error.newPassword}
			/>

			<Input
				placeholder='Confirmar nueva contraseña'
				autoCapitalize='none'
				containerStyle={input}
				password={true}
				secureTextEntry={hideConfirmNewPassword}
				onChange={(e) => setConfirmNewPassword(e.nativeEvent.text)}
				rightIcon={{
					type: 'material-community',
					name: hideConfirmNewPassword ? 'eye-outline' : 'eye-off-outline',
					color: '#c2c2c2',
					onPress: () =>
						setHideConfirmNewPassword(!hideConfirmNewPassword),
				}}
				errorMessage={error.newPassword}
			/>
			{error.general && <Text>{error.general}</Text>}

			<Button
				title='Cambiar contraseña'
				disabled={isLoading}
				disabledStyle={btn}
				containerStyle={btnContainer}
				buttonStyle={btn}
				onPress={updatePassword}
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

export default ChangePasswordForm;
