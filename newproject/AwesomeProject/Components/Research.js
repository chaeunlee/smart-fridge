import React from 'react';
import {
    Button,
  } from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
export default class Research extends React.Component{
    static navigationOptions = {
        title: 'Welcome',
    };
    render(){
        const {navigate}=this.props.navigation;
        return(
            <Button
                title="Go Recipe Search"
                onPress={()=>navigate('RecipeSearch2')}
            />
        )
    }
}