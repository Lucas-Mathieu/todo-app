import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

type TaskFormProps = {
  initialTitle?: string;
  initialDescription?: string;
  onSubmit: (title: string, description: string) => void;
};

const TaskForm: React.FC<TaskFormProps> = ({
  initialTitle = '',
  initialDescription = '',
  onSubmit,
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);

  const handleSubmit = () => {
    if (title.trim()) {
      onSubmit(title.trim(), description.trim());
      setTitle('');
      setDescription('');
    }
  };

  return (
    <View style={styles.form}>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Titre de la tâche"
        style={styles.input}
      />
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Description (optionnel)"
        style={[styles.input, styles.description]}
        multiline
      />
      <View style={styles.buttonContainer}>
        <Button title="Valider" onPress={handleSubmit} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    width: '100%',
    marginTop: 40,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    marginBottom: 16,
  },
  description: {
    height: 80,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    marginTop: 8,
  },
});

export default TaskForm;
