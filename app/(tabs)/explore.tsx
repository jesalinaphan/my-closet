import { StyleSheet, Image, Platform, FlatList, View } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

const clothes = [
  { id: '1', image: require('../../assets/clothes/IMG_3049.jpeg') },
  { id: '2', image: require('../../assets/clothes/IMG_3050.jpeg') },
  { id: '3', image: require('../../assets/clothes/IMG_3051.jpeg') },
  { id: '4', image: require('../../assets/clothes/IMG_3052.jpeg') },
  { id: '5', image: require('../../assets/clothes/IMG_3053.jpeg') },
  { id: '6', image: require('../../assets/clothes/IMG_3054.jpeg') },
  { id: '7', image: require('../../assets/clothes/IMG_3055.jpeg') },
  { id: '8', image: require('../../assets/clothes/IMG_3056.jpeg') },
  { id: '9', image: require('../../assets/clothes/IMG_3057.jpeg') },
  { id: '10', image: require('../../assets/clothes/IMG_3058.jpeg') },
  { id: '11', image: require('../../assets/clothes/IMG_3059.jpeg') },
  { id: '12', image: require('../../assets/clothes/IMG_3060.jpeg') }
];

export default function ClosetScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
        />
      }>
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>My Closet</ThemedText>
      <FlatList
        data={clothes}
        keyExtractor={(item) => item.id}
        numColumns={2} 
        renderItem={({ item }) => (
          <View style={styles.imageContainer}>
            <Image source={item.image} style={styles.image} />
          </View>
        )}
      />
    </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  imageContainer: {
    flex: 1,
    aspectRatio: 1, // Keeps images square
    margin: 5,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});
