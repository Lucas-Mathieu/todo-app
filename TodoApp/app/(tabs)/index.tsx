import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { Link, useRouter, Stack } from 'expo-router';
import TaskList from '../../components/TaskList';
import Container from '../../components/Container';
import { useTasks } from '@/context/TaskContext';
import { useTaskActions } from '@/hooks/useTaskActions';

const CATEGORY_COLORS: Record<string, string> = {
  Travail: '#1976D2',
  Personnel: '#9C27B0',
  Courses: '#fc0303',
  Autre: '#E67E22',
};

// Statuts (bulles vertes)
const STATUSES = [
  { value: 'active', label: 'En cours', color: '#43A047' },
  { value: 'completed', label: 'Terminées', color: '#388E3C' }
];

// Catégories (bulles colorées)
const CATEGORIES = [
  { value: 'Travail', label: 'Travail', color: CATEGORY_COLORS['Travail'] },
  { value: 'Personnel', label: 'Personnel', color: CATEGORY_COLORS['Personnel'] },
  { value: 'Courses', label: 'Courses', color: CATEGORY_COLORS['Courses'] },
  { value: 'Autre', label: 'Autre', color: CATEGORY_COLORS['Autre'] }
];

export const getCategoryColor = (category: string) =>
  CATEGORY_COLORS[category] || '#757575';

export default function HomeScreen() {
  const { tasks } = useTasks();
  const { toggleTask, deleteTask } = useTaskActions();
  const router = useRouter();

  // null = aucun filtre actif
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<'active' | 'completed' | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Filtrage combiné
  const filteredTasks = tasks.filter(task => {
    const matchesCategory = !categoryFilter || task.category === categoryFilter;
    const matchesStatus =
      !statusFilter ||
      (statusFilter === 'completed' && task.completed) ||
      (statusFilter === 'active' && !task.completed);
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

  // Gestion du clic sur une bulle (désélection si déjà sélectionné)
  const handleCategoryPress = (category: string) => {
    setCategoryFilter(prev => prev === category ? null : category);
  };
  const handleStatusPress = (status: 'active' | 'completed') => {
    setStatusFilter(prev => prev === status ? null : status);
  };

  return (
    <Container>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <Text style={styles.title}>Mes tâches</Text>

        {/* Champ de recherche */}
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher une tâche..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        {/* Scrollbar horizontale : statuts PUIS catégories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterScroll}
          contentContainerStyle={styles.filterScrollContent}
        >
          {/* Statuts (bulles vertes) */}
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
              onPress={() => handleStatusPress(status.value as 'active' | 'completed')}
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
          {/* Catégories (bulles colorées) */}
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

        {/* Liste des tâches filtrées */}
        <TaskList
          tasks={filteredTasks}
          onToggleComplete={handleToggleComplete}
          onEdit={handleEdit}
          onDelete={handleDelete}
          getCategoryColor={getCategoryColor} // <-- Passe la fonction pour colorer les tâches
        />

        {/* Bouton d'ajout */}
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