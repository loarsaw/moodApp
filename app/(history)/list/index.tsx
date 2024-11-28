import { RootState } from '@/redux/store';
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { useSelector } from 'react-redux';

type quesString = {
  question: string; options: string[]; correctAnswer: string;
}

type HistoryItem = {
  id: string;
  questions: quesString[],
  score: number,
  attemptedOn: string;
};

const QuizHistory: React.FC = () => {
  const { history } = useSelector((state: RootState) => state.history)

  const renderItem = ({ item }: { item: HistoryItem }) => (
    <View style={styles.itemContainer}>
      {/* <Image source={{ uri: item.avatar }} style={styles.avatar} /> */}

      {/* attemptedOn and Score */}
      <View style={styles.textContainer}>
        <Text style={styles.attemptedOn}>{item.attemptedOn}</Text>
        <Text style={styles.score}>Score: {item.score}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quiz History</Text>
      {history.length == 0 ? <Text>No Attempted Quiz</Text> : (

        <FlatList
          data={history}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  attemptedOn: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  score: {
    fontSize: 14,
    color: '#555',
  },
});

export default QuizHistory;
