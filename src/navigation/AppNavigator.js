import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import PanelSelectionScreen from '../screens/PanelSelectionScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import DriverDashboardScreen from '../screens/DriverDashboardScreen';
import AdminDashboardScreen from '../screens/AdminDashboardScreen';
import ProviderDashboardScreen from '../screens/ProviderDashboardScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false, cardStyle: { backgroundColor: '#F3F4F6' } }}>
                <Stack.Screen name="PanelSelection" component={PanelSelectionScreen} />

                {/* Admin */}
                <Stack.Screen name="AdminLogin">
                    {props => <LoginScreen {...props} title="Admin" panel="Admin Panel" dashboardScreen="AdminDashboard" />}
                </Stack.Screen>
                <Stack.Screen name="AdminRegister">
                    {props => <RegisterScreen {...props} title="Admin" panel="Admin Panel" />}
                </Stack.Screen>
                <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} />

                {/* Driver */}
                <Stack.Screen name="DriverLogin">
                    {props => <LoginScreen {...props} title="Driver" panel="Driver Panel" dashboardScreen="DriverDashboard" />}
                </Stack.Screen>
                <Stack.Screen name="DriverRegister">
                    {props => <RegisterScreen {...props} title="Driver" panel="Driver Panel" />}
                </Stack.Screen>
                <Stack.Screen name="DriverDashboard" component={DriverDashboardScreen} />

                {/* Provider */}
                <Stack.Screen name="ProviderLogin">
                    {props => <LoginScreen {...props} title="Provider" panel="Provider Panel" dashboardScreen="ProviderDashboard" />}
                </Stack.Screen>
                <Stack.Screen name="ProviderRegister">
                    {props => <RegisterScreen {...props} title="Provider" panel="Provider Panel" />}
                </Stack.Screen>
                <Stack.Screen name="ProviderDashboard" component={ProviderDashboardScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
