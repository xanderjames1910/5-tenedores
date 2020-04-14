import React, { useEffect, useState } from 'react';
import { Alert, Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import { Avatar, Button, Icon, Input, Image } from 'react-native-elements';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';

import Modal from '../../Modal';

const WidthScreen = Dimensions.get('window').width;

const AddRestaurantForm = (props) => {
	// Componentn State
	// ImageRestaurant & UploadImage State
	const [imagesSelected, setImagesSelected] = useState([]);

	// FormAdd State
	const [restaurantName, setRestaurantName] = useState('');
	const [restaurantAddress, setRestaurantAddrees] = useState('');
	const [restaurantDescription, setRestaurantDescripcion] = useState('');

	// Map State
	const [isVisibleMap, setIsVisibleMap] = useState(false);
	const [locationRestaurant, setLocationRestaurant] = useState(null);

	// Props destructuring
	const { navigation, setIsLoading, toastRef } = props;

	// Component functions
	const send = () => {
		console.log('Nombre: ', restaurantName);
		console.log('Dirección: ', restaurantAddress);
		console.log('Descripción: ', restaurantDescription);
	};

	return (
		<ScrollView>
			<ImageRestaurant imageRestaurant={imagesSelected[0]} />
			<UploadImage
				imagesSelected={imagesSelected}
				setImagesSelected={setImagesSelected}
				toastRef={toastRef}
			/>
			<FormAdd
				setRestaurantName={setRestaurantName}
				setRestaurantAddrees={setRestaurantAddrees}
				setRestaurantDescripcion={setRestaurantDescripcion}
				setIsVisibleMap={setIsVisibleMap}
				locationRestaurant={locationRestaurant}
			/>
			<Map
				isVisibleMap={isVisibleMap}
				setIsVisibleMap={setIsVisibleMap}
				setLocationRestaurant={setLocationRestaurant}
				toastRef={toastRef}
			/>
			<Button title='Guardar Restaurante' onPress={send} />
		</ScrollView>
	);
};

const ImageRestaurant = (props) => {
	// Props destructuring
	const { imageRestaurant } = props;

	// Styles destructuring
	const { imageStyle, viewPhoto } = styles;

	return (
		<View style={viewPhoto}>
			{imageRestaurant ? (
				<Image source={{ uri: imageRestaurant }} style={imageStyle} />
			) : (
				<Image
					source={require('../../../../assets/img/no-image-restaurant.png')}
					style={imageStyle}
				/>
			)}
		</View>
	);
};

const UploadImage = (props) => {
	// Props destructuring
	const { imagesSelected, setImagesSelected, toastRef } = props;

	// Styles destructuring
	const { containerIcon, miniatureStyle, viewImages } = styles;

	// Componentn functions
	const imageSelect = async () => {
		const resultaPermission = await Permissions.askAsync(
			Permissions.CAMERA_ROLL,
		);

		const resultPermissionCamera =
			resultaPermission.permissions.cameraRoll.status;

		if (resultPermissionCamera === 'denied') {
			toastRef.current.show(
				'Es necesario aceptar los permisos de la Galería. Deberás aceptarlos manualmente desde ajustes',
				6000,
			);
		} else {
			const result = await ImagePicker.launchImageLibraryAsync({
				allowsEditing: true,
				aspect: [4, 3],
			});

			if (result.cancelled) {
				toastRef.current.show(
					'Has cerrado la galería sin seleccionar ninguna imagen',
					2000,
				);
			} else {
				setImagesSelected([...imagesSelected, result.uri]);
			}
		}
	};

	const removeImage = (image) => {
		const arrayImages = imagesSelected;

		Alert.alert(
			'Eliminar imagen',
			'¿Estás seguro de que quieres eliminar la imagen?',
			[
				{
					text: 'Cancelar',
					style: 'cancel',
				},
				{
					text: 'Eliminar',
					onPress: () =>
						setImagesSelected(
							arrayImages.filter((imageUrl) => imageUrl !== image),
						),
				},
			],
			{
				cancelable: false,
			},
		);
	};

	return (
		<View style={viewImages}>
			{imagesSelected.length < 4 && (
				<Icon
					type='material-community'
					name='camera'
					color='#7a7a7a'
					containerStyle={containerIcon}
					onPress={imageSelect}
				/>
			)}

			{imagesSelected.map((imageRestaurant, index) => (
				<Avatar
					key={index}
					onPress={() => removeImage(imageRestaurant)}
					style={miniatureStyle}
					source={{ uri: imageRestaurant }}
				/>
			))}
		</View>
	);
};

const FormAdd = (props) => {
	// Props destructuring
	const {
		locationRestaurant,
		setRestaurantName,
		setRestaurantAddrees,
		setRestaurantDescripcion,
		setIsVisibleMap,
	} = props;

	// Styles destructuring
	const { input, textArea, viewForm } = styles;

	return (
		<View style={viewForm}>
			<Input
				placeholder='Nombre del restaurante'
				containerStyle={input}
				onChange={(e) => setRestaurantName(e.nativeEvent.text)}
			/>

			<Input
				placeholder='Dirección'
				containerStyle={input}
				rightIcon={{
					type: 'material-community',
					name: 'google-maps',
					color: locationRestaurant ? '#00a680' : '#c2c2c2',
					onPress: () => setIsVisibleMap(true),
				}}
				onChange={(e) => setRestaurantAddrees(e.nativeEvent.text)}
			/>

			<Input
				placeholder='Descripción del restaurante'
				multiline={true}
				containerStyle={textArea}
				onChange={(e) => setRestaurantDescripcion(e.nativeEvent.text)}
			/>
		</View>
	);
};

const Map = (props) => {
	// Component State
	const [location, setLocation] = useState(null);

	// Porps destructuring
	const {
		isVisibleMap,
		setIsVisibleMap,
		setLocationRestaurant,
		toastRef,
	} = props;

	// Styles destructuring
	const {
		mapStyle,
		viewMapBtn,
		viewMapBtnContainerCancel,
		viewMapBtnCancel,
		viewMapBtnContainerSave,
		viewMapBtnSave,
	} = styles;

	useEffect(() => {
		(async () => {
			const resultaPermissions = await Permissions.askAsync(
				Permissions.LOCATION,
			);

			const statusPermissions =
				resultaPermissions.permissions.location.status;

			if (statusPermissions !== 'granted') {
				toastRef.current.show(
					'Tienes que aceptar los permisos de localización para crear un restaurante',
					4000,
				);
			} else {
				const loc = await Location.getCurrentPositionAsync({});

				setLocation({
					latitude: loc.coords.latitude,
					longitude: loc.coords.longitude,
					latitudeDelta: 0.001,
					longitudeDelta: 0.001,
				});
			}
		})();
	}, []);

	// Component functions
	const confirmLocation = () => {
		setLocationRestaurant(location);
		toastRef.current.show('Locaclización guardada correctamente.', 3000);

		setIsVisibleMap(false);
	};

	return (
		<Modal isVisible={isVisibleMap} setIsVisible={setIsVisibleMap}>
			<View>
				{location && (
					<MapView
						style={mapStyle}
						initialRegion={location}
						showsUserLocation={true}
						onRegionChange={(region) => setLocation(region)}>
						<MapView.Marker
							coordinate={{
								latitude: location.latitude,
								longitude: location.longitude,
							}}
							draggable
						/>
					</MapView>
				)}
				<View style={viewMapBtn}>
					<Button
						title='Guardar Ubicación'
						onPress={confirmLocation}
						containerStyle={viewMapBtnContainerSave}
						buttonStyle={viewMapBtnSave}
					/>

					<Button
						title='Cancelar Ubicación'
						onPress={() => setIsVisibleMap(false)}
						containerStyle={viewMapBtnContainerCancel}
						buttonStyle={viewMapBtnCancel}
					/>
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	viewPhoto: {
		alignItems: 'center',
		height: 200,
		marginBottom: 20,
	},
	imageStyle: {
		width: WidthScreen,
		height: 200,
	},
	viewImages: {
		flexDirection: 'row',
		marginHorizontal: 20,
		// marginTop: 30,
	},
	containerIcon: {
		alignItems: 'center',
		justifyContent: 'center',
		marginRight: 10,
		height: 70,
		width: 70,
		backgroundColor: '#e3e3e3',
	},
	miniatureStyle: {
		width: 70,
		height: 70,
		marginRight: 10,
	},
	viewForm: {
		margin: 10,
	},
	input: {
		marginBottom: 10,
	},
	textArea: {
		height: 100,
		width: '100%',
		padding: 0,
		margin: 0,
	},
	mapStyle: {
		width: '100%',
		height: 350,
	},
	viewMapBtn: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: 10,
	},
	viewMapBtnContainerSave: {
		paddingRight: 5,
	},
	viewMapBtnSave: {
		backgroundColor: '#00a680',
	},
	viewMapBtnContainerCancel: {},
	viewMapBtnCancel: {
		backgroundColor: '#a60d0d',
	},
});

export default AddRestaurantForm;
