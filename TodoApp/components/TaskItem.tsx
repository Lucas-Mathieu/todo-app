// src/components/TaskItem.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

type TaskItemProps = {
  title: string;
  completed?: boolean;
  onPress?: () => void;
};

const TaskItem = ({ title, completed = false, onPress }: TaskItemProps) => (
  <TouchableOpacity onPress={onPress} style={styles.item}>
    <Text style={[styles.text, completed && styles.completed]}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  item: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  text: {
    fontSize: 16,
  },
  completed: {
    textDecorationLine: 'line-through',
    color: '#aaa',
  },
});

export default TaskItem;
