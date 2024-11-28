import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Image, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

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
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '+1234567890',
      quizzesAttempted: 15,
      dateOfJoining: '2024-01-01',
      avatar: 'https://via.placeholder.com/100',
    },
  });

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [newAvatar, setNewAvatar] = useState<string>('https://via.placeholder.com/100');

  const handleSaveAvatar = () => {
    setValue('avatar', newAvatar);
    setIsModalVisible(false);
  };

  const onSubmit = (data: AccountDetails) => {
  };

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
  },
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
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  editAvatarButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  editAvatarText: {
    color: '#fff',
    fontSize: 14,
  },
  detailContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  inputError: {
    borderColor: 'red',
  },
  value: {
    fontSize: 16,
    color: '#333',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});

export default AccountPage;
