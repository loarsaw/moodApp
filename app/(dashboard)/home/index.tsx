import { off, on } from '@/redux/asyncSlice/slice';
import { addSet } from '@/redux/questionSlice/slice';
import { RootState } from '@/redux/store';
import axiosInstance from '@/utils/axiosInstance';
import { router } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { buttonVariantByState } from '../../../utils/cva'; // Import the helper function

const HomePage = () => {
  const {
    user: { email },
  } = useSelector((state: RootState) => state.user);
  const { alreadyAttempted } = useSelector((state: RootState) => state.questions);
  const { loading } = useSelector((state: RootState) => state.async)
  const dispatch = useDispatch();


  const initialize = useCallback(async () => {
    dispatch(on());
    const { data } = await axiosInstance.post('/get-questions', {
      already_completed: alreadyAttempted,
    });
    dispatch(addSet(data.questions));
    dispatch(off());
    router.push('/(dashboard)/quiz');
  }, [email, alreadyAttempted]);

  return (
    <View className="flex-1 justify-center items-center bg-emerald-50 px-5">
      <Text className="text-4xl font-bold text-blue-600 mb-10 text-center">
        Quizzzz APP
      </Text>
      <TouchableOpacity
        className={buttonVariantByState(loading)}
        onPress={() => initialize()}
        disabled={loading}
      >
        <Text className="text-white text-lg font-bold uppercase">
          {loading ? 'Loading...' : 'Start Quiz'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomePage;
