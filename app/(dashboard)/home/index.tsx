import { RootState } from '@/redux/store';
import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

const HomePage = () => {
  const [searchText, setSearchText] = useState('');
  const { value } = useSelector((state: RootState) => state.counter);
  const { loading } = useSelector((state: RootState) => state.async);

  return (
    <View style={styles.container}>
      {/* Title */}
      <View>
        <Text style={styles.title}>Quizzzz APP</Text>
      </View>

    
      {/* Centered Button */}
      <TouchableOpacity style={styles.startButton} onPress={() => {router.push("/quiz") }}>
        <Text style={styles.startButtonText}>Start Quiz</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
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
    marginBottom: 30,
  },
  emoji: {
    fontSize: 40,
  },
  startButton: {
    marginTop: 20,
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 10,
    alignItems: 'center',
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomePage;
