import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ActionButton from 'react-native-action-button';
import * as firebase from 'firebase';

const Restaurants = (props) => {
	// Component State
	const [user, setUser] = useState(null);

	// Props destructuring
	const { navigation } = props;

	// Styles destructuring
	const { viewBody } = styles;

	useEffect(() => {
		firebase.auth().onAuthStateChanged((userInfo) => {
			setUser(userInfo);
			console.log(userInfo);
		});
	}, []);

	return (
		<View style={viewBody}>
			<Text>Estamos en restaurantes</Text>
			{user && <AddRestaurantButton navigation={navigation} />}
		</View>
	);
};

const AddRestaurantButton = (props) => {
	// Props destructuring
	const { navigation } = props;

	return (
		<ActionButton
			buttonColor='#00a680'
			onPress={() => navigation.navigate('AddRestaurant')}
		/>
	);
};

const styles = StyleSheet.create({
	viewBody: {
		flex: 1,
	},
});

export default Restaurants;
