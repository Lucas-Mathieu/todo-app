import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import type { Task } from '../context/TaskContext';

type TaskItemProps = {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  category: string;
  categoryColor: string;
  onToggleComplete: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onShowDetail: (task: Task) => void;
};

const TaskItem: React.FC<TaskItemProps> = ({
  id,
  title,
  description,
  completed,
  category,
  categoryColor,
  onToggleComplete,
  onEdit,
  onDelete,
  onShowDetail,
}) => {
  return (
    <View style={[styles.container, { borderLeftColor: categoryColor }]}>
      <TouchableOpacity onPress={() => onToggleComplete(id)} style={styles.checkbox}>
        {completed && <View style={styles.checked} />}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.textContainer}
        onPress={() =>
          onShowDetail({ id, title, description, completed, category })
        }
      >
        <Text style={[styles.title, completed && styles.completedText]}>{title}</Text>
        {description ? (
          <Text
            style={styles.description}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {description}
          </Text>
        ) : null}
        <Text style={[styles.category, { color: categoryColor }]}>{category}</Text>
      </TouchableOpacity>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => onEdit(id)}>
          <Text style={styles.actionText}>Éditer</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(id)}>
          <Text style={[styles.actionText, styles.deleteText]}>Supprimer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    alignItems: 'center',
    borderLeftWidth: 5,
    backgroundColor: '#fff',
  },
  completedTask: {
    backgroundColor: '#f8f8f8'
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center'
  },
  checked: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#3498db'
  },
  textContainer: {
    flex: 1,
    marginLeft: 10
  },
  title: {
    fontSize: 16,
    fontWeight: '500'
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
    maxWidth: '95%',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#999'
  },
  category: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: 'bold',
  },
  actions: {
    flexDirection: 'row'
  },
  actionText: {
    color: '#3498db',
    marginLeft: 15
  },
  deleteText: {
    color: '#e74c3c'
  }
});

export default TaskItem;
