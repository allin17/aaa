import React, {useEffect, useRef, useState} from 'react';
import {Animated, ActivityIndicator, FlatList, Image, Text, View} from "react-native";
import {dataAPI} from "../api";
import icons from "../constants/icons";

const RealTimeCurrency = () => {
    const [currencyList, setCurrencyList] = useState([])

    const fadeAnim = new Animated.Value(0)


    useEffect(() => {
        const list = dataAPI.getQuotesTick()
            .then((data) => {
                setCurrencyList(data)
            })
    }, [])

    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 60,
            width: 400
        }}>
            {
                currencyList.length != 0
                ? <FlatList
                        data={currencyList}
                        ListHeaderComponent={
                            <View style={{
                                flexDirection: "row",
                                justifyContent: 'space-between'
                            }}>
                                <Text>symbol</Text>
                                <Text style={{
                                    marginRight: 50
                                }}>ask</Text>
                                <Text style={{
                                    marginRight: 50
                                }}>change</Text>
                            </View>
                        }
                        renderItem={({item, index}) => {
                            let priceColor = item.change24h == 0
                                ? "#757575"
                                : item.change24h > 0
                                    ? "#4BEE70" : "#D84035"

                            Animated.loop(
                                Animated.timing(fadeAnim, {
                                    toValue: 0.1,
                                    duration: 1000,
                                    useNativeDriver: false
                                })
                            ).start()


                            const background = fadeAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: ["white", priceColor]
                            })

                            return (
                                <Animated.View style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    marginBottom: 10,
                                    borderBottomColor: "black",
                                    borderBottomWidth: 1,
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    backgroundColor: background
                                }}>
                                    {/*Symbol*/}
                                    <View
                                        style={{
                                            width: 70
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 16
                                            }}>
                                            {item.symbol}
                                        </Text>
                                    </View>
                                    {/*Ask*/}
                                    <View style={{
                                        width: 60,
                                    }}>
                                        <Text style={{
                                            flex: 1,
                                            fontSize: 16,
                                            width: 60
                                        }}>
                                            {item.ask}
                                        </Text>
                                    </View>

                                    {/*Change*/}
                                    <View style={{
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <Text
                                            style={{
                                                color: priceColor,
                                                fontSize: 16,
                                                width: 60
                                            }}
                                        >
                                            {item.change24h}
                                        </Text>
                                    </View>

                                    <View style={{
                                        flexDirection: 'row',
                                    }}>
                                        <Text style={{
                                            textAlign: 'right',
                                            width: 50
                                        }}>
                                            {item.change24h.toFixed(2)}
                                        </Text>
                                        {
                                            item.change24h != 0 &&
                                            <Image
                                                source={icons.upArrow}
                                                style={{
                                                    width: 20,
                                                    height: 20,
                                                    tintColor: priceColor,
                                                    transform: item.change24h > 0 ? [{rotate: "45deg"}] : [{rotate: "125deg"}]
                                                }}
                                            />
                                        }

                                    </View>
                                </Animated.View>
                            )
                        }}
                    />
                    : <ActivityIndicator size="large"/>
            }
        </View>
    );
};

export default RealTimeCurrency;
