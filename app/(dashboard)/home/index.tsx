import { addSet } from '@/redux/questionSlice/slice';
import { RootState } from '@/redux/store';
import axiosInstance from '@/utils/axiosInstance';
import { router } from 'expo-router';
import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

const HomePage = () => {
  const {
    user: { email },
  } = useSelector((state: RootState) => state.user);
  const { alreadyAttempted } = useSelector((state: RootState) => state.questions);
  const dispatch = useDispatch();

  const initialize = useCallback(async () => {
    const { data } = await axiosInstance.post('/get-questions', {
      already_completed: alreadyAttempted,
    });
    dispatch(addSet(data.questions));
    router.push('/(dashboard)/quiz');
  }, [email, alreadyAttempted]);

  return (
    <View className="flex-1 justify-center items-center bg-emerald-50 px-5">
      <Text className="text-4xl font-bold text-blue-600 mb-10 text-center">
        Quizzzz APP
      </Text>
      <TouchableOpacity
        className="bg-green-600 px-12 py-4 rounded-full shadow-md shadow-black"
        onPress={() => initialize()}
      >
        <Text className="text-white text-lg font-bold uppercase">Start Quiz</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomePage;
