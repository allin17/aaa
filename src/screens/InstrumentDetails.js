import React from 'react';
import {Text, View} from "react-native";

const InstrumentDetails = ({route}) => {
    const {instrument} = route.params
    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Text>DETAILS</Text>
            <Text>Symbol: {instrument.symbol}</Text>
            <Text>Description: {instrument.description}</Text>
            <Text>Digits: {instrument.digits}</Text>
            <Text>Trade: {instrument.trade}</Text>
            <Text>Type: {instrument.type}</Text>
        </View>
    );
};

export default InstrumentDetails;
