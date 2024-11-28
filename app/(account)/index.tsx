import AsyncStorage from '@react-native-async-storage/async-storage';
import { Redirect, router } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Image,
  Modal,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

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
  const [accountDetails, setAccountDetails] = useState<AccountDetails>({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1234567890',
    quizzesAttempted: 15,
    dateOfJoining: '2024-01-01',
    avatar: 'https://via.placeholder.com/100',
  });

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [newAvatar, setNewAvatar] = useState<string>(accountDetails.avatar);
  const [token, setToken] = useState<string | null>(null); // Assuming token is a string or null

  // if (token == null) {
  //   router.push("/signin");
  // }

  const handleSaveAvatar = () => {
    setAccountDetails((prev) => ({ ...prev, avatar: newAvatar }));
    setIsModalVisible(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Account Details</Text>

        <View style={styles.avatarContainer}>
          <Image source={{ uri: accountDetails.avatar }} style={styles.avatar} />
          <TouchableOpacity
            style={styles.editAvatarButton}
            onPress={() => {
              AsyncStorage.setItem("new", "kaskakjs");
              setIsModalVisible(true);
            }}
          >
            <Text style={styles.editAvatarText}>Edit Avatar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.detailContainer}>
          <Text style={styles.label}>First Name:</Text>
          <TextInput
            style={styles.input}
            value={accountDetails.firstName}
            onChangeText={(text) =>
              setAccountDetails((prev) => ({ ...prev, firstName: text }))
            }
          />
        </View>

        <View style={styles.detailContainer}>
          <Text style={styles.label}>Last Name:</Text>
          <TextInput
            style={styles.input}
            value={accountDetails.lastName}
            onChangeText={(text) =>
              setAccountDetails((prev) => ({ ...prev, lastName: text }))
            }
          />
        </View>


        <Button title="Save Changes" onPress={() => alert('Changes saved!')} />

        <Modal
          visible={isModalVisible}
          transparent={true}
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
});

export default AccountPage;
