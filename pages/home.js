import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Map from "../components/home/map";

export default function Home() {
  return (
    <View>
      <Map/>
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
