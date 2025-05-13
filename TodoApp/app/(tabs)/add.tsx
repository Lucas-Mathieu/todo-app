import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import TaskForm from '../../components/TaskForm';
import { Ionicons } from '@expo/vector-icons';

export default function AddTaskScreen() {
  const router = useRouter();

  const handleSubmit = (title: string) => {
    // logique à compléter
    router.back();
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#7d7d7d" />
        </TouchableOpacity>
        <TaskForm onSubmit={handleSubmit} />
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
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    padding: 8,
    zIndex: 10,
  }, 
});
