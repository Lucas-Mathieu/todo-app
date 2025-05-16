import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { Link, useRouter, Stack } from 'expo-router';
import TaskList from '@/components/TaskList';
import Container from '@/components/Container';
import { useTasks } from '@/context/TaskContext';
import { useTaskActions } from '@/hooks/useTaskActions';
import { Status, Category } from '@/types';

// Couleurs des catégories via enum
const CATEGORY_COLORS: Record<Category, string> = {
  [Category.TRAVAIL]: '#1976D2',
  [Category.PERSONNEL]: '#9C27B0',
  [Category.COURSES]: '#fc0303',
  [Category.AUTRE]: '#E67E22',
};

// Configuration des statuts (utilise l'enum Status)
const STATUSES = [
  { value: Status.ACTIVE, label: 'En cours', color: '#43A047' },
  { value: Status.COMPLETED, label: 'Terminées', color: '#388E3C' }
];

// Configuration des catégories (utilise l'enum Category)
const CATEGORIES = [
  { value: Category.TRAVAIL, label: 'Travail', color: CATEGORY_COLORS[Category.TRAVAIL] },
  { value: Category.PERSONNEL, label: 'Personnel', color: CATEGORY_COLORS[Category.PERSONNEL] },
  { value: Category.COURSES, label: 'Courses', color: CATEGORY_COLORS[Category.COURSES] },
  { value: Category.AUTRE, label: 'Autre', color: CATEGORY_COLORS[Category.AUTRE] }
];

// Helper pour obtenir la couleur d'une catégorie (type-safe)
export const getCategoryColor = (category: Category) =>
  CATEGORY_COLORS[category] || '#757575';

export default function HomeScreen() {
  const { tasks } = useTasks();
  const { toggleTask, deleteTask } = useTaskActions();
  const router = useRouter();

  // States typés avec les enums
  const [categoryFilter, setCategoryFilter] = useState<Category | null>(null);
  const [statusFilter, setStatusFilter] = useState<Status | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Filtrage avec vérification des enums
  const filteredTasks = tasks.filter(task => {
    const matchesCategory = !categoryFilter || task.category === categoryFilter;
    const matchesStatus =
      !statusFilter ||
      (statusFilter === Status.COMPLETED && task.completed) ||
      (statusFilter === Status.ACTIVE && !task.completed);
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (task.description?.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesStatus && matchesSearch;
  });

  const handleToggleComplete = (id: number) => toggleTask(id);

  const handleEdit = (id: number) => {
    router.push({ pathname: '/(tabs)/edit/[id]', params: { id: id.toString() } });
  };

  const handleDelete = (id: number) => {
    Alert.alert(
      "Supprimer la tâche",
      "Voulez-vous vraiment supprimer cette tâche ?",
      [
        { text: "Annuler", style: "cancel" },
        { text: "Supprimer", style: "destructive", onPress: () => deleteTask(id) }
      ]
    );
  };

  // Gestion des filtres avec types stricts
  const handleCategoryPress = (category: Category) => {
    setCategoryFilter(prev => prev === category ? null : category);
  };

  const handleStatusPress = (status: Status) => {
    setStatusFilter(prev => prev === status ? null : status);
  };

  return (
    <Container>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <Text style={styles.title}>Mes tâches</Text>

        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher une tâche..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterScroll}
          contentContainerStyle={styles.filterScrollContent}
        >
          {/* Statuts utilisant l'enum */}
          {STATUSES.map(status => (
            <TouchableOpacity
              key={status.value}
              style={[
                styles.filterBubble,
                {
                  backgroundColor: statusFilter === status.value ? status.color : '#e8f5e9',
                  borderColor: status.color,
                }
              ]}
              onPress={() => handleStatusPress(status.value)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.filterBubbleText,
                  {
                    color: statusFilter === status.value ? '#fff' : status.color,
                    fontWeight: statusFilter === status.value ? 'bold' : '500'
                  }
                ]}
              >
                {status.label}
              </Text>
            </TouchableOpacity>
          ))}

          {/* Catégories utilisant l'enum */}
          {CATEGORIES.map(category => (
            <TouchableOpacity
              key={category.value}
              style={[
                styles.filterBubble,
                {
                  backgroundColor: categoryFilter === category.value ? category.color : '#f3f3f3',
                  borderColor: category.color,
                }
              ]}
              onPress={() => handleCategoryPress(category.value)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.filterBubbleText,
                  {
                    color: categoryFilter === category.value ? '#fff' : category.color,
                    fontWeight: categoryFilter === category.value ? 'bold' : '500'
                  }
                ]}
              >
                {category.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <TaskList
          tasks={filteredTasks}
          onToggleComplete={handleToggleComplete}
          onEdit={handleEdit}
          onDelete={handleDelete}
          getCategoryColor={getCategoryColor}
        />

        <Link href="/add" asChild>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>Ajouter une tâche</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </Container>
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
  searchInput: {
    height: 40,
    borderColor: '#BDBDBD',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  filterScroll: {
    marginBottom: 16,
    maxHeight: 48,
  },
  filterScrollContent: {
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  filterBubble: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
  },
  filterBubbleText: {
    fontWeight: '500',
    fontSize: 15,
  },
  addButton: {
    marginTop: 16,
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});