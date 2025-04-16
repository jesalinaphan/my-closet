import { StyleSheet, Image, Platform, Pressable, View, ScrollView } from 'react-native';
import { Link, router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useColorScheme } from '@/hooks/useColorScheme';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const clothes = [
  { id: '1', image: require('../../assets/clothes/IMG_3049.jpeg') },
  { id: '2', image: require('../../assets/clothes/IMG_3050.jpeg') },
];

const luggages = [
  { id: '1', destination: 'Hawaii', date: 'May 4 - 7, 2025' },
  { id: '2', destination: 'Maldives', date: 'Apr 27 - 30, 2024' },
  { id: '3', destination: 'Aspen', date: 'Dec 1 - 12, 2023' },
];

export default function HomeScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        <ThemedText type="subtitle" style={styles.title}>Welcome to Your{'\n'}Closet!</ThemedText>
        
        {/* My Clothes Section */}
        <View style={styles.section}>
          <Pressable 
            style={styles.sectionHeader}
            onPress={() => router.push('/explore')}>
            <ThemedText style={styles.sectionTitle}>My Clothes</ThemedText>
            <MaterialIcons name="checkroom" size={24} color="#584333" />
          </Pressable>
          <View style={styles.clothesContainer}>
            <View style={styles.clothesRow}>
              {clothes.map((item, index) => (
                <View key={item.id} style={styles.imageContainer}>
                  <Image source={item.image} style={styles.image} />
                </View>
              ))}
              <Pressable 
                style={styles.moreButton}
                onPress={() => router.push('/explore')}>
                <ThemedText style={styles.moreButtonText}>→</ThemedText>
              </Pressable>
            </View>
          </View>
        </View>

        {/* My Luggages Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemedText style={styles.sectionTitle}>My Luggages</ThemedText>
            <MaterialIcons name="luggage" size={24} color="#584333" />
          </View>
          <View style={styles.luggagesContainer}>
            {luggages.map((luggage) => (
              <Pressable 
                key={luggage.id} 
                style={styles.luggageItem}
                onPress={() => console.log(`Navigate to ${luggage.destination} luggage`)}>
                <ThemedText style={styles.destination}>{luggage.destination}</ThemedText>
                <ThemedText style={styles.date}>{luggage.date}</ThemedText>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 50,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginTop: 3,
    marginBottom: 30,
    color: '#584333',
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#584333',
    paddingBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginRight: 10,
    color: '#584333',
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: '#584333',
  },
  clothesContainer: {
    marginBottom: 20,
  },
  clothesRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    width: 120,
    height: 120,
    marginRight: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  moreButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#584333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreButtonText: {
    color: '#fff',
    fontSize: 24,
  },
  luggagesContainer: {
    gap: 15,
  },
  luggageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderWidth: 1,
    borderColor: '#584333',
    borderRadius: 15,
  },
  destination: {
    fontSize: 20,
    fontWeight: '500',
    color: '#584333',
  },
  date: {
    fontSize: 16,
    color: '#584333',
  },
});
