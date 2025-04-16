import React from 'react';
import { StyleSheet, Image, Platform, Pressable, View } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Share } from 'react-native';

// Image mapping
const imageMapping = {
  '1': require('../assets/clothes/IMG_3049.jpeg'),
  '2': require('../assets/clothes/IMG_3050.jpeg'),
  '3': require('../assets/clothes/IMG_3051.jpeg'),
  '4': require('../assets/clothes/IMG_3052.jpeg'),
  '5': require('../assets/clothes/IMG_3053.jpeg'),
  '6': require('../assets/clothes/IMG_3054.jpeg'),
};

// Dummy data - in a real app, this would come from a database
const clothingDetails = {
  '1': { brand: 'Zara', size: 'S' },
  '2': { brand: 'Urban Outfitters', size: 'XS' },
  '3': { brand: 'H&M', size: 'M' },
  '4': { brand: 'Uniqlo', size: 'S' },
  '5': { brand: 'Reformation', size: 'S' },
  '6': { brand: 'Aritzia', size: 'XS' },
};

export default function ClothingDetailScreen() {
  const { id } = useLocalSearchParams();
  const colorScheme = useColorScheme() ?? 'light';
  const router = useRouter();

  const details = clothingDetails[id as keyof typeof clothingDetails];
  
  const handleBack = () => {
    router.back();
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this item from my closet!`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Stack.Screen 
        options={{
          headerShown: false
        }} 
      />
      <ThemedView style={styles.container}>
        <Pressable onPress={handleBack} style={styles.backButton}>
          <ThemedText style={styles.backButtonText}>← Back</ThemedText>
        </Pressable>

        <View style={styles.imageContainer}>
          <Image 
            source={imageMapping[id as keyof typeof imageMapping]} 
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <ThemedText style={styles.label}>Brand:</ThemedText>
            <ThemedText style={styles.value}>{details.brand}</ThemedText>
          </View>

          <View style={styles.detailRow}>
            <ThemedText style={styles.label}>Size:</ThemedText>
            <ThemedText style={styles.value}>{details.size}</ThemedText>
          </View>
        </View>

        <View style={styles.shareButtonContainer}>
          <Pressable 
            style={styles.shareButton}
            onPress={handleShare}>
            <ThemedText style={styles.shareButtonText}>Share with Friends</ThemedText>
          </Pressable>
        </View>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#faf6e9',
  },
  backButton: {
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 20,
  },
  backButtonText: {
    fontSize: 18,
    color: '#584333',
    fontWeight: '600',
  },
  imageContainer: {
    width: '100%',
    height: '45%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  detailsContainer: {
    flex: 1,
    padding: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(88, 67, 51, 0.2)',
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#584333',
  },
  value: {
    fontSize: 18,
    color: '#584333',
  },
  shareButtonContainer: {
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
  },
  shareButton: {
    backgroundColor: '#584333',
    borderRadius: 25,
    padding: 15,
    alignItems: 'center',
  },
  shareButtonText: {
    color: '#faf6e9',
    fontSize: 18,
    fontWeight: '600',
  },
}); 