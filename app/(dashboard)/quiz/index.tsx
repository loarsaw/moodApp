import CountdownTimer from '@/components/ui/Timer';
import { addToHistory } from '@/redux/historySlice/slice';
import { RootState } from '@/redux/store';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

type QuizQuestion = {
  question: string;
  options: string[];
  correctAnswer: string;
};

type Answers = Record<number, string>;
// const quizQuestions: QuizQuestion[] = [
//   {
//     question: 'What is the capital of France?',
//     options: ['Paris', 'London', 'Berlin', 'Madrid'],
//     correctAnswer: 'Paris',
//   },
//   {
//     question: 'Which planet is known as the Red Planet?',
//     options: ['Earth', 'Mars', 'Jupiter', 'Venus'],
//     correctAnswer: 'Mars',
//   },
//   {
//     question: 'What is the largest ocean on Earth?',
//     options: ['Atlantic', 'Indian', 'Arctic', 'Pacific'],
//     correctAnswer: 'Pacific',
//   },
// ];

const HomePage: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [answers, setAnswers] = useState<Answers>({});
  const { questions } = useSelector((state: RootState) => state.questions)
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [isRunning, setIsRunning] = useState(true);
  const currentQuestion = questions[currentQuestionIndex];
  const dispatch = useDispatch()
  const handleNext = () => {
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
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setSelectedOption(answers[currentQuestionIndex - 1] || '');
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };
  // to push to list screen when time is over
  useEffect(() => {
    if (secondsLeft == 0) {
      router.push("/(history)/list")

    }
  }, [secondsLeft])
  const handleSubmit = () => {
    let score = 0;
    questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        score += 1;
      }
    });
    dispatch(addToHistory({ attemptedOn: new Date().toDateString(), id: "1", questions: questions, score: score }))
    router.push("/(history)/list")
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Quizzzz APP</Text> */}
      <View><CountdownTimer isRunning={isRunning} secondsLeft={secondsLeft} setSecondsLeft={setSecondsLeft} /></View>
      <Text style={styles.question}>{currentQuestion.question}</Text>

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
    marginBottom: 5,
  },
  question: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  optionsContainer: {
    width: '100%',
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: '#007BFF',
    borderColor: '#0056b3',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  navButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  navButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomePage;
