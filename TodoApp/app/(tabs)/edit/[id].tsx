import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import Container from '../../../components/Container';
import { Ionicons } from '@expo/vector-icons';

export default function TaskDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  return (
    <>
      <Container>
        <Stack.Screen options={{ headerShown: false }} />
        <View style={styles.container}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#7d7d7d" />
          </TouchableOpacity>
          <Text style={styles.title}>Détail de la tâche</Text>
          <Text style={styles.id}>ID : {id}</Text>
        </View>
      </Container>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    padding: 8,
    zIndex: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  id: {
    fontSize: 16,
    color: '#666',
  },
});
