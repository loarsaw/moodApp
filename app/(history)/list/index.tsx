import { RootState } from '@/redux/store';
import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { useSelector } from 'react-redux';

type quesString = {
  question: string;
  options: string[];
  correctAnswer: string;
};

type HistoryItem = {
  id: string;
  questions: quesString[];
  score: number;
  attemptedOn: string;
};

const QuizHistory: React.FC = () => {
  const { history } = useSelector((state: RootState) => state.history);

  const renderItem = ({ item }: { item: HistoryItem }) => (
    <View style={styles.itemContainer}>
  
      <View style={styles.textContainer}>
        <Text style={styles.attemptedOn}>{item.attemptedOn}</Text>
        <Text style={styles.score}>Score: {item.score}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quiz History</Text>
      {history.length === 0 ? (
        <View style={styles.emptyStateContainer}>
          <Text style={styles.emptyStateText}>No Attempted Quiz</Text>
        </View>
      ) : (
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
    backgroundColor: '#E9F7F1',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#2A2A2A', 
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4, 
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  score: {
    fontSize: 16,
    color: '#555',
  },
  emptyStateContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyStateText: {
    fontSize: 18,
    color: '#888',
  },
});

export default QuizHistory;
