import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import * as firebase from 'firebase';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

const InfoUser = (props) => {
	// Props Destructuring
	const {
		setIsLoading,
		setReloadData,
		setTextLoading,
		toastRef,
		userInfo: { displayName, email, photoURL, uid },
	} = props;

	// Styles destructuring
	const { displayNameStyle, userInfoAvatar, userInfoView } = styles;

	// Component Functions
	const uploadImage = async (uri, imageName) => {
		// Loading status
		setTextLoading('Actualizando Avatar');
		setIsLoading(true);

		const response = await fetch(uri);
		const blob = await response.blob();

		const ref = firebase.storage().ref().child(`avatar/${imageName}`);

		return ref.put(blob);
	};

	const updatePhotoUrl = (uid) => {
		firebase
			.storage()
			.ref(`avatar/${uid}`)
			.getDownloadURL()
			.then(async (result) => {
				const update = {
					photoURL: result,
				};
				await firebase.auth().currentUser.updateProfile(update);
				setReloadData(true);
				setIsLoading(false);
			})
			.catch(() => {
				toastRef.current.show(
					'Error al recuperar el avatar del servidor',
					1500,
				);
			});
	};

	const changeAvatar = async () => {
		const resultPermission = await Permissions.askAsync(
			Permissions.CAMERA_ROLL,
		);

		const resultPermissionCamera =
			resultPermission.permissions.cameraRoll.status;

		if (resultPermissionCamera === 'denied') {
			toastRef.current.show(
				'Es necesario aceptar los permiso de la galería',
				1500,
			);
		} else {
			const result = await ImagePicker.launchImageLibraryAsync({
				allowsEditing: true,
				aspect: [4, 3],
			});

			if (result.cancelled) {
				toastRef.current.show(
					'Has cerrado la galería de imágenes sin selecionar ninguna imagen',
					1500,
				);
			} else {
				uploadImage(result.uri, uid).then(() => {
					updatePhotoUrl(uid);
				});
			}
		}
	};

	return (
		<View style={userInfoView}>
			<Avatar
				rounded
				size='large'
				showEditButton
				onEditPress={changeAvatar}
				containerStyle={userInfoAvatar}
				source={{
					uri: photoURL
						? photoURL
						: `https://ui-avatars.com/api/?name=${displayName}`,
				}}
			/>
			<View>
				<Text style={displayNameStyle}>
					{displayName ? displayName : 'Anónimo'}
				</Text>
				<Text>{email ? email : 'Login con Facebook'}</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	userInfoView: {
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
		backgroundColor: '#f2f2f2',
		paddingVertical: 30,
	},
	userInfoAvatar: {
		marginRight: 20,
	},
	displayNameStyle: {
		fontWeight: 'bold',
	},
});

export default InfoUser;
