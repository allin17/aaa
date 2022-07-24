import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import icons from '../constants/icons';

const Pagination = ({quotesPerPage, totalQuotes, paginateRight, paginateLeft, currentPage}) => {

    return (
        <View style={{
            flex: 1,

        }}>
            {totalQuotes != 0 &&
                <View style={{flexDirection: 'row',
                    justifyContent: 'space-between',}}>
                <TouchableOpacity
                    style={{
                        marginRight: 10,
                    }}
                    onPress={() => paginateLeft(currentPage)}
                >
                    <Image
                        source={icons.rightArrow}
                        style={{
                            width: 30,
                            height: 30,
                            transform: [{rotate: '180deg'}],
                        }}
                    />
                </TouchableOpacity>

                <View style={{
                flexDirection: 'row',
                marginTop: 5,
            }}>
                <Text
                style={{
                marginRight: 8,
                fontSize: 18,
            }}
                >
            {
                quotesPerPage*currentPage > totalQuotes
                ? totalQuotes
                    : quotesPerPage*currentPage
            } of
                </Text>
                <Text
                style={{
                fontSize: 18,
            }}
                >
            {totalQuotes}
                </Text>
                </View>

                <TouchableOpacity
                style={{
                marginLeft: 10,
            }}
                onPress={() => paginateRight(currentPage, totalQuotes, quotesPerPage)}
                >
                <Image
                source={icons.rightArrow}
                style={{
                width: 30,
                height: 30,
            }}
                />
                </TouchableOpacity>
                </View>
            }
        </View>
    );
};

export default Pagination;
