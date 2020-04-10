import { createStackNavigator } from 'react-navigation-stack';

import AccountScreen from '../screens/Account/Account';
import LoginScreen from '../screens/Account/Login';
import RegisterScreen from '../screens/Account/Register';

const AccountScreenStacks = createStackNavigator({
	Account: {
		screen: AccountScreen,
		navigationOptions: () => ({
			title: 'Mi Cuenta',
		}),
	},
	Login: {
		screen: LoginScreen,
		navigationOptionsL: () => ({
			title: 'Login',
		}),
	},
	Register: {
		screen: RegisterScreen,
		navigationOptions: () => ({
			title: 'Registro',
		}),
	},
});

export default AccountScreenStacks;
