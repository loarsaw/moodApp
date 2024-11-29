import { addSet } from '@/redux/questionSlice/slice';
import { RootState } from '@/redux/store';
import axiosInstance from '@/utils/axiosInstance';
import { router } from 'expo-router';
import React, { useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

const HomePage = () => {
  const { user: { email } } = useSelector((state: RootState) => state.user)
  const { questions, alreadyAttempted } = useSelector((state: RootState) => state.questions)
  const dispatch = useDispatch()
  const initialize = useCallback(async () => {
    const { data } = await axiosInstance.post("/get-questions", { already_completed: alreadyAttempted })
    dispatch(addSet(data.questions))
    router.push("/(dashboard)/quiz")
  }, [email, alreadyAttempted])

  console.log(alreadyAttempted)
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quizzzz APP</Text>

      <TouchableOpacity
        style={styles.startButton}
        onPress={() => initialize()}
      >
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
    backgroundColor: '#E9F7F1',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1A73E8',
    marginBottom: 40,
    textAlign: 'center',
    fontFamily: 'sans-serif-condensed',
  },
  startButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 18,
    paddingHorizontal: 60,
    borderRadius: 30,
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default HomePage;
