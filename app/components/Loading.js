import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { Overlay } from 'react-native-elements';

const Loading = (props) => {
	//Props destructuring
	const { isVisible, text } = props;

	// Styles destructuring
	const { overlay, loadingText, view } = styles;

	return (
		<Overlay
			isVisible={isVisible}
			windowBackgroundColor='rgba(0, 0, 0, 0.5)'
			overlayBackgroundColor='transparent'
			overlayStyle={overlay}>
			<View style={view}>
				<ActivityIndicator size='large' color='#00a680' />
				{text && <Text style={loadingText}>{text}</Text>}
			</View>
		</Overlay>
	);
};

const styles = StyleSheet.create({
	overlay: {
		height: 100,
		width: 200,
		backgroundColor: '#fff',
		borderColor: '#00a680',
		borderWidth: 2,
		borderRadius: 10,
	},
	view: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	loadingText: {
		color: '#00a680',
		textTransform: 'uppercase',
		marginTop: 10,
	},
});

export default Loading;
