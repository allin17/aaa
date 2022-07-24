import React, {useEffect, useReducer, useState} from 'react';
import {Animated, ActivityIndicator, FlatList, Text, TextInput, View, Alert} from 'react-native';
import {dataAPI} from "../api";
import Pagination from "../components/Pagination";

const Home = ({navigation}) => {

    /*usereducer logic*/
    function reducer(state, action) {
        switch (action.type) {
            case 'changePage':
                return {
                    ...state,
                    currentPage: action.payload
                }
            default:
                return state
        }
    }

    const [quotesList, setQuotesList] = useState([])
    const [inputValue, setInputValue] = useState('')

    const [state, dispatch] = useReducer(
        reducer, {currentPage: 1, quotesPerPage: 15}
    )

    useEffect(() => {
        dataAPI.getQuotesList()
            .then((data) => {
                if(!inputValue){
                    setQuotesList(data.quotesList)
                } else {
                    let arr = data.quotesList.filter((el) => {
                        return el.description.toLowerCase().includes(inputValue.toLowerCase())
                    })
                    {arr.length == 0 &&
                    Alert.alert(
                        "Cant find anything"
                    )
                    }
                    setQuotesList(arr)
                    dispatch({type:'changePage', payload: 1})
                }
            })
    }, [inputValue])

    /*Pagination*/
    const indexOfLastQuote = state.currentPage * state.quotesPerPage
    const indexOfFirstQuote = indexOfLastQuote - state.quotesPerPage
    const currentQuotes = quotesList.slice(indexOfFirstQuote, indexOfLastQuote)

    const paginateLeft = (pageNumber) => {
        if(pageNumber>1) {
            dispatch({type: 'changePage', payload: pageNumber - 1})
        }
    }

    const paginateRight = (pageNumber, totalQuotes, quotesPerPage) => {
        if(quotesPerPage*pageNumber < totalQuotes) {
            dispatch({type:'changePage', payload: pageNumber + 1})
        }
    }

    const renderItem = ({item}) => {
            return (
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    borderStyle: 'solid',
                    borderColor: 'black',
                    borderWidth: 1
                }}>
                    <Text
                        style={{
                            height: 30,
                            width: 320,
                            textAlign: 'center'
                        }}
                        onPress={() => navigation.navigate("InstrumentDetails", {
                            instrument: item
                        })}
                    >{item.description}</Text>
                </View>
            )

    }

    const scrollY = React.useRef(new Animated.Value(0)).current;

    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 50
        }}>
            <TextInput
                style={{
                    backgroundColor: "yellow",
                    marginBottom: 20,
                    padding: 10,
                    borderWidth: 1,
                    width: 310,
                    defaultValue: "Euro"
                }}
                placeholder="Search"
                placeholderTextColor="gray"
                maxLength={40}
                textAlign="center"
                value={inputValue}
                onChangeText={(text) => setInputValue(text)}
            />

            {
                quotesList.length != 0
                    ? <FlatList
                        data={currentQuotes.filter((val) => {
                            if(inputValue == "") {
                                return val
                            } else if (val.description.toLowerCase().includes(inputValue.toLowerCase())) {
                                return val
                            }
                        })}
                        keyExtractor={(item, i) => item.description + i}
                        renderItem={renderItem}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                            {
                                useNativeDriver: false,
                            }
                        )}
                        pagingEnabled
                        vertical
                        scrollEventThrottle={16}
                        decelerationRate={'normal'}
                        showsVerticalScrollIndicator={false}
                    />
                    : <ActivityIndicator size="large"/>
            }


            <Pagination
                quotesPerPage={state.quotesPerPage}
                totalQuotes={quotesList.length}
                paginateLeft={paginateLeft}
                paginateRight={paginateRight}
                currentPage={state.currentPage}
            />

        </View>
    );
};

export default Home;
