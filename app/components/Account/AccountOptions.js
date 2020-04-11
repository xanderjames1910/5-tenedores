import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ListItem } from 'react-native-elements';

import Modal from '../Modal';
import ChangeDisplayNameForm from './Forms/ChangeDisplayNameForm';
import ChangeEmailForm from './Forms/ChangeEmailForm';
import ChangePasswordForm from './Forms/ChangePasswordForm';

const AccountOptions = (props) => {
	// Component State
	const [isVisibleModal, setIsVisibleModal] = useState(false);
	const [renderComponent, setRenderComponent] = useState(null);

	// Porps destructuring
	const { setReloadData, toastRef, userInfo } = props;

	// Styles destructuring
	const { menuItem } = styles;

	// Component functions
	const selectedMenu = (key) => {
		switch (key) {
			case 'displayName':
				setRenderComponent(
					<ChangeDisplayNameForm
						displayName={userInfo.displayName}
						setIsVisibleModal={setIsVisibleModal}
						setReloadData={setReloadData}
						toastRef={toastRef}
					/>,
				);
				setIsVisibleModal(true);
				break;
			case 'email':
				setRenderComponent(
					<ChangeEmailForm
						email={userInfo.email}
						setIsVisibleModal={setIsVisibleModal}
						setReloadData={setReloadData}
						toastRef={toastRef}
					/>,
				);
				setIsVisibleModal(true);
				break;
			case 'password':
				setRenderComponent(
					<ChangePasswordForm
						setIsVisibleModal={setIsVisibleModal}
						toastRef={toastRef}
					/>,
				);
				setIsVisibleModal(true);
				break;
			default:
				break;
		}
	};

	// Component Setting
	const menuOptions = [
		{
			title: 'Cambiar Nombre y Apellido',
			iconType: 'material-community',
			iconNameLeft: 'account-circle',
			iconColorLeft: '#ccc',
			iconNameRight: 'chevron-right',
			iconColorRight: '#ccc',
			onPress: () => selectedMenu('displayName'),
		},
		{
			title: 'Cambiar Email',
			iconType: 'material-community',
			iconNameLeft: 'at',
			iconColorLeft: '#ccc',
			iconNameRight: 'chevron-right',
			iconColorRight: '#ccc',
			onPress: () => selectedMenu('email'),
		},
		{
			title: 'Cambiar Contraseña',
			iconType: 'material-community',
			iconNameLeft: 'lock-reset',
			iconColorLeft: '#ccc',
			iconNameRight: 'chevron-right',
			iconColorRight: '#ccc',
			onPress: () => selectedMenu('password'),
		},
	];

	return (
		<View>
			{menuOptions.map((menu, index) => (
				<ListItem
					key={index}
					title={menu.title}
					leftIcon={{
						type: menu.iconType,
						name: menu.iconNameLeft,
						color: menu.iconColorLeft,
					}}
					rightIcon={{
						type: menu.iconType,
						name: menu.iconNameRight,
						color: menu.iconColorRight,
					}}
					onPress={menu.onPress}
					containerStyle={menuItem}
				/>
			))}
			{renderComponent && (
				<Modal isVisible={isVisibleModal} setIsVisible={setIsVisibleModal}>
					{renderComponent}
				</Modal>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	menuItem: {
		borderBottomWidth: 1,
		borderBottomColor: '#e3e3e3',
	},
});

export default AccountOptions;
