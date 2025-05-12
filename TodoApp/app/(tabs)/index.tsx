import { View, Text, Button, StyleSheet } from 'react-native';
import { Link, useRouter, Stack } from 'expo-router';
import TaskList from '../../components/TaskList';

const tasks = [
  { id: '1', title: 'Acheter du pain', completed: false },
  { id: '2', title: 'Faire les devoirs', completed: true },
];

export default function HomeScreen() {
  const router = useRouter();

  const handleTaskPress = (id: string) => {
    router.push({ pathname: '/(tabs)/edit/[id]', params: { id } });
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <Text style={styles.title}>Mes tâches</Text>
        <TaskList tasks={tasks} onTaskPress={handleTaskPress} />
        <Link href="/add" asChild>
          <Button title="Ajouter une tâche" />
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});
