import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import RealTimeCurrency from "../screens/RealTimeCurrency";

const Tab = createBottomTabNavigator()

const screenOptions = {
    headerShown: false,
    tabBarIconStyle: {}
}

export const Tabs = () => {
    return (
        <Tab.Navigator
            {...{screenOptions}}
        >
            <Tab.Screen
                name="QuotesList"
                component={Home}
                options={{
                    tabBarIcon: () => null,
                    tabBarLabelStyle: {fontSize: 20, bottom: 8}
                }}
            />
            <Tab.Screen
                name="RealTimeCurrency"
                component={RealTimeCurrency}
                options={{
                    tabBarIcon: () => null,
                    tabBarLabelStyle: {fontSize: 20, bottom: 8}
                }}
            />
        </Tab.Navigator>
    )
}
