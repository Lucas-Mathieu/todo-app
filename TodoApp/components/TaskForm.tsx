// src/components/TaskForm.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

type TaskFormProps = {
  initialValue?: string;
  onSubmit: (title: string) => void;
};

const TaskForm = ({ initialValue = '', onSubmit }: TaskFormProps) => {
  const [title, setTitle] = useState(initialValue);

  const handleSubmit = () => {
    if (title.trim()) {
      onSubmit(title.trim());
      setTitle('');
    }
  };

  return (
    <View style={styles.form}>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Ajouter une tâche"
        style={styles.input}
      />
      <Button title="Valider" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    flexDirection: 'row',
    marginVertical: 8,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    marginRight: 8,
  },
});

export default TaskForm;
