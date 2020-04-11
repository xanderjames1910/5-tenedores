import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import * as firebase from 'firebase';

const ChangeDisplayNameForm = (props) => {
	// Component State
	const [newDisplayName, setNewDisplayName] = useState(null);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	// Props destructiuring
	const { displayName, setIsVisibleModal, setReloadData, toastRef } = props;

	// Styles destructuring
	const { btn, btnContainer, input, view } = styles;

	// Component functions
	const updateDisplayName = () => {
		setError(null);
		if (!newDisplayName) {
			setError('El Nombre de usuario no ha cambiado');
		} else {
			setIsLoading(true);
			const update = {
				displayName: newDisplayName,
			};
			firebase
				.auth()
				.currentUser.updateProfile(update)
				.then(() => {
					setIsLoading(false);
					setReloadData(true);
					toastRef.current.show('Nombre actulizado correctamente', 1500);
					setIsVisibleModal(false);
				})
				.catch(() => {
					setError('Error al actualizar el nombre');
					setIsLoading(false);
				});
		}
	};

	return (
		<View style={view}>
			<Input
				placeholder='Nombre'
				containerStyle={input}
				defaultValue={displayName && displayName}
				onChange={(e) => setNewDisplayName(e.nativeEvent.text)}
				rightIcon={{
					type: 'material-community',
					name: 'account-circle-outline',
					color: '#c2c2c2',
				}}
				errorMessage={error}
			/>
			<Button
				title='Cambiar nombre'
				disabled={isLoading}
				disabledStyle={btn}
				containerStyle={btnContainer}
				buttonStyle={btn}
				onPress={updateDisplayName}
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
		marginBottom: 10,
	},
	btnContainer: {
		marginTop: 20,
		width: '95%',
	},
	btn: {
		backgroundColor: '#00a680',
	},
});

export default ChangeDisplayNameForm;
