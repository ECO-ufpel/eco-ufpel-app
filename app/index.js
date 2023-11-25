import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from 'tamagui'

export default function App({}) {
  return (
    
      <View style={styles.container}>
        <Text>ECO UFPEL</Text>
        <Link asChild href="/dash">
          <Button as size="$6">
            dash poc navigation
          </Button>
        </Link>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

