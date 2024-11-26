import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

const EmojiSearchPage = () => {
    const [searchText, setSearchText] = useState('');
    const { } = useSelector((state: any) => state.counter)
    return (
        <View style={styles.container}>
            {/* Search Bar */}
            <View>
                <Text style={{ fontSize: 30, fontWeight: 'bold', marginBottom: 10 }}>MOOD APP</Text>
            </View>
            <TextInput
                style={styles.searchBar}
                placeholder="How are you feeling.."
                value={searchText}
                onChangeText={setSearchText}
                onSubmitEditing={() => { router.push("/(dashboard)") }}
            />

            {/* Emoji Icons */}
            <View style={styles.emojiContainer}>
                <Link
                    href={"/(dashboard)"}
                >


                    <Text style={styles.emoji}>😊</Text>
                </Link>
                <TouchableOpacity>
                    <Text style={styles.emoji}>😂</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.emoji}>😍</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.emoji}>🥺</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    searchBar: {
        height: 40,
        width: '100%',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 10,
        marginBottom: 20,
    },
    emojiContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    emoji: {
        fontSize: 40,
    },
});

export default EmojiSearchPage;
