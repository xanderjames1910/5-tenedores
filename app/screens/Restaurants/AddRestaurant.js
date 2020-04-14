import React, { useRef, useState } from 'react';
import { View } from 'react-native';
import Toast from 'react-native-easy-toast';

import Loading from '../../components/Loading';
import AddRestaurantForm from '../../components/Restaurants/Forms/AddRestaurantForm';

const AddRestaurant = (props) => {
	// Component State
	const [isLoading, setIsLoading] = useState(false);

	// Props destructuring
	const { navigation } = props;

	// Component Hooks
	const toastRef = useRef();

	return (
		<View>
			<AddRestaurantForm
				toastRef={toastRef}
				navigation={navigation}
				setIsLoading={setIsLoading}
			/>
			<Toast ref={toastRef} position='center' opacity={0.5} />
			<Loading isVisible={isLoading} text='Creando Restaurante' />
		</View>
	);
};

export default AddRestaurant;
