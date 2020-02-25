import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';

class SelectIngredientIcon extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return <View style={styles.container}></View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
});

export default SelectIngredientIcon;
