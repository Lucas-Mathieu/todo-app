import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

type TaskItemProps = {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  onToggleComplete: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
};

const TaskItem: React.FC<TaskItemProps> = ({
  id,
  title,
  description,
  completed,
  onToggleComplete,
  onEdit,
  onDelete
}) => {
  return (
    <View style={[styles.container, completed && styles.completedTask]}>
      <TouchableOpacity
        style={styles.checkbox}
        onPress={() => onToggleComplete(id)}
      >
        {completed && <View style={styles.checked} />}
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={[styles.title, completed && styles.completedText]}>
          {title}
        </Text>
        {description && (
          <Text style={[styles.description, completed && styles.completedText]}>
            {description}
          </Text>
        )}
      </View>
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
    alignItems: 'center'
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
    marginTop: 4
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#999'
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
