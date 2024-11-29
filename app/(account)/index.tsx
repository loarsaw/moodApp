import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Image, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { getItem, setItem } from '@/utils/asyncStorage';
import { router } from 'expo-router';
import axiosInstance from '@/utils/axiosInstance';

const schema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email address').required('Email is required'),
  phone: yup.string().matches(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number').required('Phone number is required'),
  quizzesAttempted: yup.number().min(0, 'Quizzes attempted must be a positive number').required('This field is required'),
  dateOfJoining: yup.string().required('Date of joining is required'),
  avatar: yup.string().url('Invalid avatar URL').required('Avatar URL is required'),
}).required();

type AccountDetails = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  quizzesAttempted: number;
  dateOfJoining: string;
  avatar: string;
};

const AccountPage: React.FC = () => {

  const { control, handleSubmit, formState: { errors }, setValue } = useForm<AccountDetails>({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfJoining: '',
    },
  });

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [newAvatar, setNewAvatar] = useState<string>('https://via.placeholder.com/100');

  const handleSaveAvatar = () => {
    setValue('avatar', newAvatar);
    setIsModalVisible(false);
  };

  const onSubmit = async (data: AccountDetails) => {
    // axiosInstance.post("/update-user", data)
  };
  useEffect(() => {
    getToken()
  }, [])

  async function getToken() {
    const gotItem = await getItem("accessToken");
    console.log(gotItem)
    if (gotItem == null) {
      router.push("/signin")
    } else {
      console.log("made req")
      await axiosInstance.get("/get-user", {
        headers: {
          Authorization: `Bearer ${gotItem}`
        }
      })
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Account Details</Text>

        <View style={styles.avatarContainer}>
          <Image source={{ uri: newAvatar }} style={styles.avatar} />
          <TouchableOpacity style={styles.editAvatarButton} onPress={() => setIsModalVisible(true)}>
            <Text style={styles.editAvatarText}>Edit Avatar</Text>
          </TouchableOpacity>
        </View>

        {/* First Name */}
        <View style={styles.detailContainer}>
          <Text style={styles.label}>First Name:</Text>
          <Controller
            control={control}
            name="firstName"
            render={({ field: { value, onChange } }) => (
              <>
                <TextInput
                  style={[styles.input, errors.firstName && styles.inputError]} // Apply error style if invalid
                  value={value}
                  onChangeText={onChange}
                />
                {errors.firstName && <Text style={styles.errorText}>{errors.firstName.message}</Text>}
              </>
            )}
          />
        </View>

        {/* Last Name */}
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Last Name:</Text>
          <Controller
            control={control}
            name="lastName"
            render={({ field: { value, onChange } }) => (
              <>
                <TextInput
                  style={[styles.input, errors.lastName && styles.inputError]}
                  value={value}
                  onChangeText={onChange}
                />
                {errors.lastName && <Text style={styles.errorText}>{errors.lastName.message}</Text>}
              </>
            )}
          />
        </View>

        {/* Email */}
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Email:</Text>
          <Controller
            control={control}
            name="email"
            render={({ field: { value, onChange } }) => (
              <>
                <TextInput
                  style={[styles.input, errors.email && styles.inputError]}
                  value={value}
                  onChangeText={onChange}
                />
                {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
              </>
            )}
          />
        </View>

        <View style={styles.detailContainer}>
          <Text style={styles.label}>Phone Number:</Text>
          <Controller
            control={control}
            name="phone"
            render={({ field: { value, onChange } }) => (
              <>
                <TextInput
                  style={[styles.input, errors.phone && styles.inputError]}
                  value={value}
                  onChangeText={onChange}
                />
                {errors.phone && <Text style={styles.errorText}>{errors.phone.message}</Text>}
              </>
            )}
          />
        </View>

        <View style={styles.detailContainer}>
          <Text style={styles.label}>Total Quizzes Attempted:</Text>
          <Controller
            control={control}
            name="quizzesAttempted"
            render={({ field: { value, onChange } }) => (
              <>
                <TextInput
                  style={[styles.input, errors.quizzesAttempted && styles.inputError]}
                  keyboardType="numeric"
                  value={value?.toString()}
                  onChangeText={(text) => onChange(Number(text))}
                />
                {errors.quizzesAttempted && <Text style={styles.errorText}>{errors.quizzesAttempted.message}</Text>}
              </>
            )}
          />
        </View>

        <View style={styles.detailContainer}>
          <Text style={styles.label}>Date of Joining:</Text>
          <Controller
            control={control}
            name="dateOfJoining"
            render={({ field: { value, onChange } }) => (
              <>
                <TextInput
                  style={[styles.input, errors.dateOfJoining && styles.inputError]}
                  value={value}
                  onChangeText={onChange}
                />
                {errors.dateOfJoining && <Text style={styles.errorText}>{errors.dateOfJoining.message}</Text>}
              </>
            )}
          />
        </View>

        <Button title="Save Changes" onPress={handleSubmit(onSubmit)} />
        <Button title="Log Out" color={"red"} onPress={() => { setItem("accessToken", null) }} />

        <Modal visible={isModalVisible} transparent={true} animationType="slide" onRequestClose={() => setIsModalVisible(false)}>
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
