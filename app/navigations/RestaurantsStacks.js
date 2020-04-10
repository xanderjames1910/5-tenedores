import { createStackNavigator } from 'react-navigation-stack';

import RestaurantsScreen from '../screens/Restaurants';

const RestaurantsScreenStacks = createStackNavigator({
	Restaurantes: {
		screen: RestaurantsScreen,
		navigationOptions: () => ({
			title: 'Restaurantes',
		}),
	},
});

export default RestaurantsScreenStacks;
