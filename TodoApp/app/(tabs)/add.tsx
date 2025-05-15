import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import TaskForm from '../../components/TaskForm';
import Container from '../../components/Container';
import { Ionicons } from '@expo/vector-icons';
import { useTaskActions } from '../../hooks/useTaskActions';

export default function AddTaskScreen() {
  const router = useRouter();
  const { addTask } = useTaskActions();

  const handleSubmit = (title: string, description: string, category: string) => {
    addTask({
      title,
      description,
      completed: false,
      category,
    });
    router.back();
  };

  return (
    <Container>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} />
        </TouchableOpacity>
        <TaskForm onSubmit={handleSubmit} />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    padding: 8,
    zIndex: 10,
  },
});
