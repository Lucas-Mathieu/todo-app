import React from 'react';
import { View, TextInput, Button, StyleSheet, Text, Platform, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Category } from '@/types';

const CATEGORIES = [
  Category.TRAVAIL,
  Category.PERSONNEL,
  Category.COURSES,
  Category.AUTRE,
];

type TaskFormProps = {
  initialTitle?: string;
  initialDescription?: string;
  initialCategory?: Category;
  initialDueDate?: string;
  onSubmit: (title: string, description: string, category: Category, dueDate?: string) => void;
};

const TaskForm: React.FC<TaskFormProps> = ({
  initialTitle = '',
  initialDescription = '',
  initialCategory = Category.TRAVAIL,
  initialDueDate,
  onSubmit,
}) => {
  const [title, setTitle] = React.useState(initialTitle);
  const [description, setDescription] = React.useState(initialDescription);
  const [category, setCategory] = React.useState(initialCategory);
  const [dueDate, setDueDate] = React.useState<Date | undefined>(
    initialDueDate ? new Date(initialDueDate) : undefined
  );
  const [showPicker, setShowPicker] = React.useState(false);

  React.useEffect(() => {
    setTitle(initialTitle);
    setDescription(initialDescription);
    setCategory(initialCategory);
    setDueDate(initialDueDate ? new Date(initialDueDate) : undefined);
  }, [initialTitle, initialDescription, initialCategory, initialDueDate]);

  const handleSubmit = () => {
    onSubmit(title, description, category, dueDate ? dueDate.toISOString() : undefined);
    setTitle('');
    setDescription('');
    setCategory(Category.TRAVAIL);
    setDueDate(undefined);
  };

  const handleDateConfirm = (date: Date) => {
    setDueDate(date);
    setShowPicker(false);
  };

  const handleDateCancel = () => {
    setShowPicker(false);
  };

  return (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        placeholder="Titre"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.input, styles.description]}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <Picker
        selectedValue={category}
        onValueChange={itemValue => setCategory(itemValue as Category)}
        style={styles.input}
      >
        {CATEGORIES.map(cat => (
          <Picker.Item key={cat} label={cat} value={cat} />
        ))}
      </Picker>
      <TouchableOpacity style={styles.dateButton} onPress={() => setShowPicker(true)}>
        <Text style={styles.dateButtonText}>
          {dueDate
            ? `Échéance : ${dueDate.toLocaleDateString()} ${dueDate.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}`
            : "Ajouter une date d'échéance"}
        </Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={showPicker}
        mode="datetime"
        date={dueDate || new Date()}
        onConfirm={handleDateConfirm}
        onCancel={handleDateCancel}
        minimumDate={new Date()}
        is24Hour={true}
        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
      />
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
  dateButton: {
    backgroundColor: '#eee',
    borderRadius: 4,
    padding: 12,
    marginBottom: 16,
    alignItems: 'center',
  },
  dateButtonText: {
    color: '#333',
    fontSize: 16,
  },
});

export default TaskForm;