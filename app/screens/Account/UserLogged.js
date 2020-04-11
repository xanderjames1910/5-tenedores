import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';
import * as firebase from 'firebase';
import Toast from 'react-native-easy-toast';

import Loading from '../../components/Loading';
import InfoUser from '../../components/Account/InfoUser';
import AccountOptions from '../../components/Account/AccountOptions';

const UserLogged = () => {
	// Component State
	const [userInfo, setUserInfo] = useState({});
	const [reloadData, setReloadData] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [textLoading, setTextLoading] = useState('');

	// Styles destructuring
	const { btnCloseSession, btnCloseSessionText, viewUserInfo } = styles;

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
		<View style={viewUserInfo}>
			<InfoUser
				userInfo={userInfo}
				setReloadData={setReloadData}
				toastRef={toastRef}
				setIsLoading={setIsLoading}
				setTextLoading={setTextLoading}
			/>
			<AccountOptions
				userInfo={userInfo}
				setReloadData={setReloadData}
				toastRef={toastRef}
			/>
			<Button
				title='Cerrar Sesión'
				buttonStyle={btnCloseSession}
				titleStyle={btnCloseSessionText}
				onPress={cerrarSesión}
			/>
			<Toast ref={toastRef} position='center' opacity={0.5} />
			<Loading isVisible={isLoading} text={textLoading} />
		</View>
	);
};

const styles = StyleSheet.create({
	viewUserInfo: {
		minHeight: '100%',
		backgroundColor: '#f2f2f2',
	},
	btnCloseSession: {
		marginTop: 30,
		borderRadius: 0,
		backgroundColor: '#fff',
		borderTopWidth: 1,
		borderTopColor: '#e3e3e3',
		borderBottomWidth: 1,
		borderBottomColor: '#e3e3e3',
		paddingVertical: 10,
	},
	btnCloseSessionText: {
		color: '#00a680',
	},
});

export default UserLogged;
