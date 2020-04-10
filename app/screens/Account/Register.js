import React, { useRef } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-easy-toast';

import RegisterForm from '../../components/Account/RegisterForm';

const Register = () => {
	// Styles destructuring
	const { logo, viewForm } = styles;

	const toastRef = useRef();

	return (
		<KeyboardAwareScrollView>
			<Image
				source={require('../../../assets/img/logo.png')}
				style={logo}
				resizeMode='contain'
			/>
			<View style={viewForm}>
				<RegisterForm toastRef={toastRef} />
			</View>
			<Toast ref={toastRef} position='center' opacity={0.5} />
		</KeyboardAwareScrollView>
	);
};

const styles = StyleSheet.create({
	logo: {
		width: '100%',
		height: 150,
		marginTop: 20,
	},
	viewForm: {
		marginHorizontal: 40,
	},
});

export default Register;
