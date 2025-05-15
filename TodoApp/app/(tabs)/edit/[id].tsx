import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import TaskForm from '../../../components/TaskForm';
import { Ionicons } from '@expo/vector-icons';
import { useTasks } from '@/context/TaskContext';
import { useTaskActions } from '@/hooks/useTaskActions';

export default function EditTaskScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { tasks } = useTasks();
  const { editTask } = useTaskActions();

  const task = tasks.find(t => t.id === Number(id));
  if (!task) {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} />
        </TouchableOpacity>
        <Text>Tâche introuvable</Text>
      </View>
    );
  }

  const handleSubmit = (title: string, description: string, category: string) => {
    editTask({
      ...task,
      title,
      description,
      category,
    });
    router.back();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} />
      </TouchableOpacity>
      <TaskForm
        initialTitle={task.title}
        initialDescription={task.description}
        initialCategory={task.category}
        onSubmit={handleSubmit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff', justifyContent: 'center' },
  backButton: { position: 'absolute', top: 10, left: 10, padding: 8, zIndex: 10 },
});
