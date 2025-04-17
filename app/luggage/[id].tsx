import { StyleSheet, Image, View, ScrollView, Pressable, Platform } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useState } from 'react';
const daysOfWeek = ['All', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const timeOfDay = ['All', 'Day', 'Night'];


const luggageData = {
  'hawaii': {
    destination: 'Hawaii',
    dates: 'May 4 - 7, 2025',
    clothes: [
      require('../../assets/clothes/IMG_3049.jpeg'),
      require('../../assets/clothes/IMG_3050.jpeg'),
      require('../../assets/clothes/IMG_3051.jpeg'),
      require('../../assets/clothes/IMG_3052.jpeg'),
    ]
  },
  'maldives': {
    destination: 'Maldives',
    dates: 'Apr 27 - 30, 2024',
    clothes: [
      require('../../assets/clothes/IMG_3051.jpeg'),
      require('../../assets/clothes/IMG_3052.jpeg'),
    ]
  },
  'aspen': {
    destination: 'Aspen',
    dates: 'Dec 1 - 12, 2023',
    clothes: [
      require('../../assets/clothes/IMG_3053.jpeg'),
      require('../../assets/clothes/IMG_3054.jpeg'),
    ]
  }
};

export default function LuggageDetailScreen() {
  const { id } = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const luggage = luggageData[id as keyof typeof luggageData];
  const [selectedDay, setSelectedDay] = useState('All');
    const [selectedTime, setSelectedTime] = useState('All');

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <Pressable 
          style={styles.backButton}
          onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={24} color="#584333" />
          <ThemedText style={styles.backButtonText}>Back</ThemedText>
        </Pressable>

        <View style={styles.header}>
        <ThemedText type="subtitle" style={styles.destination}>{luggage?.destination}</ThemedText>
        <ThemedText style={styles.dates}>Dates: {luggage?.dates}</ThemedText>
        </View>

        {/* Filters */}
<View style={styles.filtersContainer}>
  {/* Day Filter */}
  <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScrollContent}>
    {daysOfWeek.map((day) => (
      <Pressable
        key={day}
        style={[styles.filterChip, selectedDay === day && styles.filterChipSelected]}
        onPress={() => setSelectedDay(day)}
      >
        <ThemedText style={[styles.filterText, selectedDay === day && styles.filterTextSelected]}>
          {day.toUpperCase()}
        </ThemedText>
      </Pressable>
    ))}
  </ScrollView>

  {/* Time Filter */}
  <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScrollContent}>
    {timeOfDay.map((time) => (
      <Pressable
        key={time}
        style={[styles.filterChip, selectedTime === time && styles.filterChipSelected]}
        onPress={() => setSelectedTime(time)}
      >
        <ThemedText style={[styles.filterText, selectedTime === time && styles.filterTextSelected]}>
          {time.toUpperCase()}
        </ThemedText>
      </Pressable>
    ))}
  </ScrollView>
</View>


<View style={styles.gridContainer}>
  {luggage?.clothes.map((image, index) => (
    <View key={index} style={styles.imageContainer}>
      <Image source={image} style={styles.image} />
    </View>
  ))}
</View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
    filtersContainer: {
        marginBottom: 20,
        gap: 10,
      },
      filterScrollContent: {
        paddingHorizontal: 10,
        gap: 8,
      },
      filterChip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#584333',
        marginRight: 8,
      },
      filterChipSelected: {
        backgroundColor: '#584333',
      },
      filterText: {
        color: '#584333',
      },
      filterTextSelected: {
        color: '#faf6e9',
      },
      
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 60 : 20,
    paddingBottom: 20,
  },
  backButtonText: {
    fontSize: 18,
    marginLeft: 8,
    color: '#584333',
    fontWeight: '500',
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  destination: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#584333',
  },
  dates: {
    fontSize: 20,
    color: '#584333',
  },
  clothesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  imageContainer: {
    width: '48%',
    aspectRatio: 1,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  
}); 