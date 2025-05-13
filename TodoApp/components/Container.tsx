import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';

type ContainerProps = ViewProps & {
  children: React.ReactNode;
};

const Container: React.FC<ContainerProps> = ({ children, style, ...props }) => (
  <View style={[styles.container, style]} {...props}>
    {children}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4,
    backgroundColor: '#fff',
  },
});

export default Container;
