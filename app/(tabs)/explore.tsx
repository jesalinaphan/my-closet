import { StyleSheet, Image, Platform, FlatList, View, ScrollView, Pressable } from 'react-native';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useState, useCallback } from 'react';

const clothes = [
  { 
    id: '1', 
    image: require('../../assets/clothes/IMG_3049.jpeg'),
    type: 'skirt',
    color: 'white'
  },
  { 
    id: '2', 
    image: require('../../assets/clothes/IMG_3050.jpeg'),
    type: 'top',
    color: 'white'
  },
  { 
    id: '3', 
    image: require('../../assets/clothes/IMG_3051.jpeg'),
    type: 'dress',
    color: 'pink'
  },
  { 
    id: '4', 
    image: require('../../assets/clothes/IMG_3052.jpeg'),
    type: 'pants',
    color: 'blue'
  },
  { 
    id: '5', 
    image: require('../../assets/clothes/IMG_3053.jpeg'),
    type: 'dress',
    color: 'black'
  },
  { 
    id: '6', 
    image: require('../../assets/clothes/IMG_3054.jpeg'),
    type: 'top',
    color: 'brown'
  },
  { id: '7', image: require('../../assets/clothes/IMG_3055.jpeg') },
  { id: '8', image: require('../../assets/clothes/IMG_3056.jpeg') },
  { id: '9', image: require('../../assets/clothes/IMG_3057.jpeg') },
  { id: '10', image: require('../../assets/clothes/IMG_3058.jpeg') },
  { id: '11', image: require('../../assets/clothes/IMG_3059.jpeg') },
  { id: '12', image: require('../../assets/clothes/IMG_3060.jpeg') }
];

const clothingTypes = ['all', 'top', 'pants', 'skirt', 'dress'];
const clothingColors = ['all', 'white', 'black', 'pink', 'blue', 'brown'];

export default function ClosetScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const themeColors = Colors[colorScheme];
  const [selectedType, setSelectedType] = useState('all');
  const [selectedColor, setSelectedColor] = useState('all');

  const filteredClothes = clothes.filter(item => {
    const matchesType = selectedType === 'all' || item.type === selectedType;
    const matchesColor = selectedColor === 'all' || item.color === selectedColor;
    return matchesType && matchesColor;
  });

  const handleClothingPress = (id: string) => {
    router.push(`/${id}`);
  };

  const renderHeader = () => (
    <View>
      <View style={[styles.header, { backgroundColor: themeColors.headerBackground }]}>
        <ThemedText type="subtitle" style={styles.title}>MY CLOSET</ThemedText>
      </View>
      
      {/* Filters */}
      <View style={styles.filtersContainer}>
        {/* Clothing Type Filter */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.filterScroll}
          contentContainerStyle={styles.filterScrollContent}>
          {clothingTypes.map((type) => (
            <Pressable
              key={type}
              style={[
                styles.filterChip,
                selectedType === type && styles.filterChipSelected
              ]}
              onPress={() => setSelectedType(type)}>
              <ThemedText style={[
                styles.filterText,
                selectedType === type && styles.filterTextSelected
              ]}>
                {type.toUpperCase()}
              </ThemedText>
            </Pressable>
          ))}
        </ScrollView>

        {/* Color Filter */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.filterScroll}
          contentContainerStyle={styles.filterScrollContent}>
          {clothingColors.map((color) => (
            <Pressable
              key={color}
              style={[
                styles.filterChip,
                selectedColor === color && styles.filterChipSelected
              ]}
              onPress={() => setSelectedColor(color)}>
              <ThemedText style={[
                styles.filterText,
                selectedColor === color && styles.filterTextSelected
              ]}>
                {color.toUpperCase()}
              </ThemedText>
            </Pressable>
          ))}
        </ScrollView>
      </View>
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={filteredClothes}
        keyExtractor={(item) => item.id}
        numColumns={2}
        ListHeaderComponent={renderHeader}
        renderItem={({ item }) => (
          <Pressable 
            style={[styles.imageContainer, { backgroundColor: themeColors.cardBackground }]}
            onPress={() => handleClothingPress(item.id)}>
            <Image source={item.image} style={styles.image} />
          </Pressable>
        )}
        contentContainerStyle={styles.contentContainer}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 15,
  },
  header: {
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 60 : 50,
    paddingBottom: 20,
    marginBottom: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: '600',
    textAlign: 'center',
    color: '#584333',
  },
  filtersContainer: {
    paddingVertical: 10,
    gap: 10,
  },
  filterScroll: {
    flexGrow: 0,
  },
  filterScrollContent: {
    paddingHorizontal: 15,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#584333',
    backgroundColor: 'transparent',
  },
  filterChipSelected: {
    backgroundColor: '#584333',
  },
  filterText: {
    fontSize: 14,
    color: '#584333',
  },
  filterTextSelected: {
    color: '#faf6e9',
  },
  imageContainer: {
    flex: 1,
    aspectRatio: 1,
    margin: 8,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#584333',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});
