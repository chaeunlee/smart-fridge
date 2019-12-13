import React from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';

const screenWidth = Math.round(Dimensions.get('window').width);

class Step extends React.PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.index}>{this.props.index + 1}</Text>
          <View style={styles.stepContainer}>
            <Text style={styles.step}>{this.props.step}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: screenWidth - 20,
    backgroundColor: '#f8f8f8',
    // backgroundColor: 'red',
    borderRadius: 20,
    margin: 5,
  },
  textContainer: {
    width: 0,
    flexGrow: 1,
    flexDirection: 'row',
    marginVertical: 5,
    marginRight: 10,
  },
  stepContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  step: {
    fontSize: 20,
    fontWeight: '300',
    paddingVertical: 3,
    marginLeft: 5,
    marginRight: 25,
  },
  index: {
    fontSize: 45,
    fontWeight: '300',
    color: '#79c8ec',
    marginLeft: 5,
  },
});

export default Step;
