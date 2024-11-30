import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, Button, Image, Modal,
  TouchableOpacity, ScrollView,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { getItem, setItem } from '@/utils/asyncStorage';
import { router } from 'expo-router';
import axiosInstance from '@/utils/axiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '@/redux/userSlice/slice';
import { RootState } from '@/redux/store';
import { off, on } from '@/redux/asyncSlice/slice';

const schema = yup.object().shape({
  firstName: yup
    .string()
    .required('First name is required')
    .matches(/^[A-Za-z]+$/, 'First name must only contain letters'),
  lastName: yup
    .string()
    .required('Last name is required')
    .matches(/^[A-Za-z]+$/, 'Last name must only contain letters'),
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),

  dateOfJoining: yup
    .string().required(),
  avatar: yup
    .string()
    .url('Invalid avatar URL')
    .required('Avatar URL is required'),
});

type AccountDetails = {
  firstName: string;
  lastName: string;
  email: string;
  dateOfJoining: string;
  avatar: string;
};

const AccountPage: React.FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);
  const { loading } = useSelector((state: RootState) => state.async);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<AccountDetails>({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      dateOfJoining: '',
      avatar: 'https://via.placeholder.com/100',
    },
  });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newAvatar, setNewAvatar] = useState('https://via.placeholder.com/100');

  const handleSaveAvatar = () => {
    setValue('avatar', newAvatar);
    setIsModalVisible(false);
  };

  const onSubmit = async (data: AccountDetails) => {
    try {
      console.log(data)
      await axiosInstance.post('/update-user', data);
      fetchUserData()
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  async function fetchUserData() {
    dispatch(on());
    const token = await getItem('accessToken');
    if (!token) {
      dispatch(off());
      router.push('/signin');
      return;
    }
    const { data } = await axiosInstance.get('/get-user', {
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch(addUser({ email: data.userData.email }));
    setValue('email', data.userData.email);

    const formattedDate = new Date(data.userData.createdAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    })
    setValue('dateOfJoining', formattedDate);

    dispatch(off());
  }

  useEffect(() => {
    (async () => {
      try {

        fetchUserData()

      } catch (error) {
        console.error('Error fetching user data:', error);
        dispatch(off());
      }
    })();
  }, [dispatch]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Account Details</Text>

        {/* Avatar Section */}
        <View style={styles.avatarContainer}>
          <Image source={{ uri: newAvatar }} style={styles.avatar} />
          <TouchableOpacity
            style={styles.editAvatarButton}
            onPress={() => setIsModalVisible(true)}
          >
            <Text style={styles.editAvatarText}>Edit Avatar</Text>
          </TouchableOpacity>
        </View>
        {/* Disabled the fields such as mail and date of joining */}
        {[
          { label: 'First Name', name: 'firstName', keyboardType: 'default', editable: true },
          { label: 'Last Name', name: 'lastName', keyboardType: 'default', editable: true },
          { label: 'Email', name: 'email', keyboardType: 'email-address', editable: false },
          { label: 'Date of Joining', name: 'dateOfJoining', keyboardType: 'default', editable: false },
        ].map(({ label, name, keyboardType, editable }) => (
          <View style={styles.detailContainer} key={name}>
            <Text style={styles.label}>{label}</Text>
            <Controller
              control={control}
              name={name as keyof AccountDetails}
              render={({ field: { value, onChange } }) => (
                <TextInput
                  editable={editable}
                  style={[styles.input, errors[name as keyof AccountDetails] && styles.inputError]}
                  value={value}
                  onChangeText={onChange}
                  keyboardType={keyboardType as any}
                />
              )}
            />
            {errors[name as keyof AccountDetails] && (
              <Text style={styles.errorText}>
                {errors[name as keyof AccountDetails]?.message}
              </Text>
            )}
          </View>
        ))}

        <Button title="Save Changes" onPress={handleSubmit(onSubmit)} />

        <View style={{ marginTop: 10 }}>
          <Button
            title="Log Out"
            color="red"
            onPress={() => {
              setItem('accessToken', null);
              router.push('/signin');
            }}
          />
        </View>

        {/* Avatar Modal */}
        <Modal
          visible={isModalVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Edit Avatar</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Avatar URL"
                value={newAvatar}
                onChangeText={setNewAvatar}
              />
              <View style={styles.modalButtonContainer}>
                <Button title="Cancel" onPress={() => setIsModalVisible(false)} />
                <Button title="Save" onPress={handleSaveAvatar} />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  skeletonAvatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#E0E0E0',
    alignSelf: 'center',
    marginBottom: 30,
  },
  skeletonField: {
    height: 45,
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
    marginBottom: 20,
  },
  skeletonButton: {
    height: 45,
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
    marginTop: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: '#F4F4F9',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 10,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
    borderWidth: 3,
    borderColor: '#FFD700', // Vibrant golden border
  },
  editAvatarButton: {
    backgroundColor: '#FF6347', // Vibrant red color
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 25,
    elevation: 3,
    shadowColor: '#FF6347',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  editAvatarText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  detailContainer: {
    marginBottom: 25,
    backgroundColor: '#F1F1F1',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
    marginBottom: 8,
  },
  input: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#333',
    shadowColor: '#ddd',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginBottom: 10,
  },
  inputError: {
    borderColor: '#E74C3C',
  },
  value: {
    fontSize: 16,
    color: '#333',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',  // Darken the background when modal appears
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 25,
    alignItems: 'center',
    elevation: 10,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
    color: '#333',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 25,
  },
  errorText: {
    color: '#E74C3C',
    fontSize: 13,
    marginTop: 5,
    fontStyle: 'italic',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 30,
    backgroundColor: '#FF6347', // Vibrant button color
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});


export default AccountPage;
