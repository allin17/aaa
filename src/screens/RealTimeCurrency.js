import React, {Children, useEffect, useRef, useState} from 'react';
import {Animated, ActivityIndicator, FlatList, Image, Text, View} from "react-native";
import {dataAPI} from "../api";
import icons from "../constants/icons";

const RealTimeCurrency = () => {
    const [currencyList, setCurrencyList] = useState([])

    const fadeAnim = new Animated.Value(0)

    const Layout = ({children}) => {
        return (
            <View style={{
                width: 70
            }}>
                {children}
            </View>
        )
    }

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
                                    <Layout>
                                        <Text
                                            style={{
                                                fontSize: 16
                                            }}>
                                            {item.symbol}
                                        </Text>
                                    </Layout>
                                    {/*Ask*/}
                                    <Layout>
                                        <Text style={{
                                            flex: 1,
                                            fontSize: 16,
                                            top: 8,
                                            right: 5
                                        }}>
                                            {item.ask}
                                        </Text>
                                    </Layout>

                                    {/*Change*/}
                                    <Layout style={{
                                    }}>
                                        <Text
                                            style={{
                                                color: priceColor,
                                                fontSize: 16
                                            }}
                                        >
                                            {item.change24h}
                                        </Text>
                                    </Layout>

                                    <Layout style={{
                                        flexDirection: 'row',
                                    }}>
                                        <Text style={{
                                            textAlign: 'right',
                                            justifyContent: 'center',
                                            top: 8,
                                            width: 50,
                                            left: 5
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
                                                    bottom: 8,
                                                    tintColor: priceColor,
                                                    transform: item.change24h > 0 ? [{rotate: "45deg"}] : [{rotate: "125deg"}]
                                                }}
                                            />
                                        }

                                    </Layout>
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
