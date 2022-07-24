import React from 'react';
import {DefaultTheme, NavigationContainer} from "@react-navigation/native"
import Home from "./src/screens/Home";
import InstrumentDetails from "./src/screens/InstrumentDetails";
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import {Tabs} from "./src/navigation/tabs";

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        border: "transparent"
    }
}

const Stack = createNativeStackNavigator()

const App = () => {
    return (
        <NavigationContainer theme={theme}>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
                initialRouteName={"Home"}
            >
                <Stack.Screen
                    name="Home"
                    component={Tabs}
                />
                <Stack.Screen
                    name="InstrumentDetails"
                    component={InstrumentDetails}
                    options={{
                        headerShown: true
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
