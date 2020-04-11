import React from 'react';
import { StyleSheet } from 'react-native';
import { Overlay } from 'react-native-elements';

const Modal = (props) => {
	// Props destructuring
	const { children, isVisible, setIsVisible } = props;

	// Styles destructuring
	const { overlay } = styles;

	// Component functions
	const closeModal = () => setIsVisible(false);

	return (
		<Overlay
			isVisible={isVisible}
			windowBackgroundColor='rgba(0, 0, 0, 0.5)'
			overlayBackgroundColor='trasparent'
			overlayStyle={overlay}
			onBackdropPress={closeModal}>
			{children}
		</Overlay>
	);
};
const styles = StyleSheet.create({
	overlay: {
		height: 'auto',
		width: '90%',
		backgroundColor: '#fff',
	},
});

export default Modal;
