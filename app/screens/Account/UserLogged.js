import React, { useEffect, useRef, useState } from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import * as firebase from 'firebase';
import Toast from 'react-native-easy-toast';

import InfoUser from '../../components/Account/InfoUser';
import Loading from '../../components/Loading';

const UserLogged = () => {
	// Component State
	const [userInfo, setUserInfo] = useState({});
	const [reloadData, setReloadData] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [textLoading, setTextLoading] = useState('');

	const toastRef = useRef();

	useEffect(() => {
		(async () => {
			const user = await firebase.auth().currentUser;
			setUserInfo(user.providerData[0]);
		})();
		setReloadData(false);
	}, [reloadData]);

	// Component Functions
	const cerrarSesión = () => {
		firebase.auth().signOut();
	};

	return (
		<View>
			<InfoUser
				userInfo={userInfo}
				setReloadData={setReloadData}
				toastRef={toastRef}
				setIsLoading={setIsLoading}
				setTextLoading={setTextLoading}
			/>
			<Button title='Cerrar Sesión' onPress={cerrarSesión} />
			<Toast ref={toastRef} position='center' opacity={0.5} />
			<Loading isVisible={isLoading} text={textLoading} />
		</View>
	);
};

export default UserLogged;
