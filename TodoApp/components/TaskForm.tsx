import React from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const CATEGORIES = ['Travail', 'Personnel', 'Courses', 'Autre'];

type TaskFormProps = {
  initialTitle?: string;
  initialDescription?: string;
  initialCategory?: string;
  onSubmit: (title: string, description: string, category: string) => void;
};

const TaskForm: React.FC<TaskFormProps> = ({
  initialTitle = '',
  initialDescription = '',
  initialCategory = CATEGORIES[0],
  onSubmit,
}) => {
  const [title, setTitle] = React.useState(initialTitle);
  const [description, setDescription] = React.useState(initialDescription);
  const [category, setCategory] = React.useState(initialCategory);

  React.useEffect(() => {
    setTitle(initialTitle);
    setDescription(initialDescription);
    setCategory(initialCategory);
  }, [initialTitle, initialDescription, initialCategory]);

  const handleSubmit = () => {
    onSubmit(title, description, category);
    setTitle('');
    setDescription('');
    setCategory(CATEGORIES[0]);
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
      <Picker
        selectedValue={category}
        onValueChange={setCategory}
        style={styles.input}
      >
        {CATEGORIES.map(cat => (
          <Picker.Item label={cat} value={cat} key={cat} />
        ))}
      </Picker>
      <View style={styles.buttonContainer}>
        <Button title="Valider" onPress={handleSubmit} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  form: { width: '100%', marginTop: 40 },
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
  buttonContainer: { marginTop: 8 },
});

export default TaskForm;
