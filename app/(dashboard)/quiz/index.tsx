import CountdownTimer from '@/components/ui/Timer';
import { addToHistory } from '@/redux/historySlice/slice';
import { RootState } from '@/redux/store';
import { router } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Animated, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

type Answers = Record<number, string>;

const HomePage: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [answers, setAnswers] = useState<Answers>({});
  const { questions } = useSelector((state: RootState) => state.questions);
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [isRunning, setIsRunning] = useState(true);
  const currentQuestion = questions[currentQuestionIndex];
  const dispatch = useDispatch();

  const handleNext = useCallback(() => {
    if (selectedOption) {
      setAnswers((prev) => ({
        ...prev,
        [currentQuestionIndex]: selectedOption,
      }));
      setSelectedOption('');
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      Alert.alert('Please select an option before proceeding.');
    }
  }, [currentQuestionIndex, selectedOption]);

  const handleBack = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setSelectedOption(answers[currentQuestionIndex - 1] || '');
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  }, [currentQuestionIndex, selectedOption]);

  useEffect(() => {
    if (secondsLeft === 0) {
      router.push("/(history)/list");
    }
  }, [secondsLeft]);

  const handleSubmit = useCallback(() => {
    let score = 0;
    questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        score += 1;
      }
    });
    dispatch(addToHistory({
      attemptedOn: new Date().toDateString(),
      id: "1",
      questions: questions,
      score: score,
    }));
    router.push("/(history)/list");
  }, [questions])

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Countdown Timer */}
      {/* Timer will cause the re rendering of the entire questions sections on every second
      possible solution
      1. useMemo or React.memo for
      2. ReStructure
      */}
      <CountdownTimer isRunning={isRunning} secondsLeft={secondsLeft} setSecondsLeft={setSecondsLeft} />

      {/* Current Question */}
      <Text style={styles.question}>{currentQuestion.question}</Text>

      {/* Options */}
      <View style={styles.optionsContainer}>
        {currentQuestion.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              selectedOption === option && styles.selectedOption,
            ]}
            onPress={() => setSelectedOption(option)}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Navigation Buttons */}
      <View style={styles.navigationContainer}>
        <TouchableOpacity
          style={[styles.navButton, currentQuestionIndex === 0 && styles.disabledButton]}
          onPress={handleBack}
          disabled={currentQuestionIndex === 0}
        >
          <Text style={styles.navButtonText}>Back</Text>
        </TouchableOpacity>

        {currentQuestionIndex === questions.length - 1 ? (
          <TouchableOpacity style={styles.navButton} onPress={handleSubmit}>
            <Text style={styles.navButtonText}>Submit</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.navButton} onPress={handleNext}>
            <Text style={styles.navButtonText}>Next</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#E9F7F1',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#2A2A2A',
  },
  question: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#1A73E8',
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 32,
  },
  optionsContainer: {
    width: '100%',
    marginBottom: 40,
  },
  optionButton: {
    backgroundColor: '#ffffff',
    borderColor: '#DDD',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 15,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  selectedOption: {
    backgroundColor: '#4CAF50',
    borderColor: '#388E3C',
  },
  optionText: {
    fontSize: 18,
    color: '#333',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  navButton: {
    backgroundColor: '#FF5722',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#BDBDBD',
  },
  navButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomePage;
