import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { Link, useRouter, Stack } from 'expo-router';
import TaskList from '../../components/TaskList';
import Container from '../../components/Container';

type Task = {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
};

const initialTasks: Task[] = [
  { id: 1, title: 'Acheter du pain', completed: false },
  { id: 2, title: 'Faire les devoirs', completed: true },
];

export default function HomeScreen() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const router = useRouter();

  // Marquer comme (non) terminée
  const handleToggleComplete = (id: number) => {
    setTasks(tasks =>
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Aller vers la page d'édition
  const handleEdit = (id: number) => {
    router.push({ pathname: '/(tabs)/edit/[id]', params: { id: id.toString() } });
  };

  // Supprimer une tâche
  const handleDelete = (id: number) => {
    Alert.alert(
      "Supprimer la tâche",
      "Voulez-vous vraiment supprimer cette tâche ?",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: () => setTasks(tasks => tasks.filter(task => task.id !== id)),
        },
      ]
    );
  };

  return (
    <>
      <Container>
        <Stack.Screen options={{ headerShown: false }} />
        <View style={styles.container}>
          <Text style={styles.title}>Mes tâches</Text>
          <TaskList
            tasks={tasks}
            onToggleComplete={handleToggleComplete}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
          <Link href="/add" asChild>
            <Button title="Ajouter une tâche" />
          </Link>
        </View>
      </Container>
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
