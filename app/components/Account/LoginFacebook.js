import React, { useState } from 'react';
import { SocialIcon } from 'react-native-elements';
import * as firebase from 'firebase';
import * as Facebook from 'expo-facebook';

import { FacebookApi } from '../../utils/Social';
import Loading from '../Loading';

const LoginFacebook = (props) => {
	// Props destructuring
	const { navigation, toastRef } = props;

	// Component State
	const [isVisibleLoading, setIsVisibleLoading] = useState(false);

	// Component functions
	const login = async () => {
		await Facebook.initializeAsync(FacebookApi.application_id);

		const {
			token,
			type,
		} = await Facebook.logInWithReadPermissionsAsync(
			FacebookApi.application_id,
			{ permissions: FacebookApi.permissions },
		);

		if (type === 'success') {
			// Loading validando e Iniciando sesión
			setIsVisibleLoading(true);

			const credentials = firebase.auth.FacebookAuthProvider.credential(
				token,
			);

			await firebase
				.auth()
				.signInWithCredential(credentials)
				.then(() => {
					navigation.navigate('Account');
				})
				.catch(() => {
					toastRef.current.show(
						'Error accediendo con Facebook. Inténtalo más tarde',
						1500,
					);
				});
		} else if (type === 'cancel') {
			toastRef.current.show('Inicio de sesión cancelado', 1500);
		} else {
			toastRef.current.show('Error desconocido. Inténtalo más tarde', 1500);
		}

		// Loading Validación/inicio de sesión completa
		setIsVisibleLoading(false);
	};

	return (
		<>
			<SocialIcon
				title='Iniciar Sesión con Facebook'
				button
				type='facebook'
				onPress={login}
			/>
			<Loading isVisible={isVisibleLoading} text='Iniciando Sesión' />
		</>
	);
};

export default LoginFacebook;
