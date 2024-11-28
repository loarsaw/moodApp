import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';

type QuizHistoryItem = {
  id: string;
  date: string;
  score: string;
  avatar: string;
};

const QuizHistory: React.FC = () => {
  const [history, setHistory] = useState<QuizHistoryItem[]>([
    {
      id: '1',
      date: '2024-11-25',
      score: '8/10',
      avatar: 'https://via.placeholder.com/50',
    },
    {
      id: '2',
      date: '2024-11-26',
      score: '7/10',
      avatar: 'https://via.placeholder.com/50',
    },
    {
      id: '3',
      date: '2024-11-27',
      score: '9/10',
      avatar: 'https://via.placeholder.com/50',
    },
  ]);

  const renderItem = ({ item }: { item: QuizHistoryItem }) => (
    <View style={styles.itemContainer}>
      {/* Avatar */}
      <Image source={{ uri: item.avatar }} style={styles.avatar} />

      {/* Date and Score */}
      <View style={styles.textContainer}>
        <Text style={styles.date}>{item.date}</Text>
        <Text style={styles.score}>Score: {item.score}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quiz History</Text>
      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
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
  date: {
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
