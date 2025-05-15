import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

type Task = {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  category: string;
};

type Props = {
  visible: boolean;
  task: Task | null;
  onClose: () => void;
};

const ModalTaskDetail: React.FC<Props> = ({ visible, task, onClose }) => {
  if (!task) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>{task.title}</Text>
          <Text style={styles.label}>Description :</Text>
          <Text style={styles.text}>{task.description || 'Aucune'}</Text>
          <Text style={styles.label}>Catégorie :</Text>
          <Text style={styles.text}>{task.category}</Text>
          <Text style={styles.label}>Statut :</Text>
          <Text style={styles.text}>{task.completed ? 'Terminée' : 'En cours'}</Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>Fermer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#0008',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    minWidth: '80%',
    alignItems: 'center',
  },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  label: { fontWeight: 'bold', marginTop: 10 },
  text: { fontSize: 16, marginBottom: 4 },
  closeButton: {
    marginTop: 24,
    backgroundColor: '#3498db',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 8,
  },
  closeText: { color: '#fff', fontWeight: 'bold' },
});

export default ModalTaskDetail;
