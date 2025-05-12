// src/components/Container.tsx
import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';

type ContainerProps = ViewProps & {
  children: React.ReactNode;
};

const Container = ({ children, style, ...props }: ContainerProps) => (
  <View style={[styles.container, style]} {...props}>
    {children}
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 8,
    elevation: 2,
  },
});

export default Container;
