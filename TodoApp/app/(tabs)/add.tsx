import { View, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import TaskForm from '../../components/TaskForm';

export default function AddTaskScreen() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <TaskForm onSubmit={title => { /* Ajoute la tâche */ }} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});