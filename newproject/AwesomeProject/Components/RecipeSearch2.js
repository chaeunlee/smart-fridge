import React from 'react';
import {
    StyleSheet,
    View,
    ActivityIndicator,
    FlatList,
    Text,
    TouchableOpacity,
    TextInput,
    Image
} from "react-native";

function Item({ id, name, img }) {
    return (
      <TouchableOpacity
        onPress={() => 
        Navigation.navigate("Res",{
            id: id,
            name: name,
        })
        
        }
      >
        <Text>{name}</Text>
        <Image
        style={{width: 50, height: 50}} 
        source={{uri:img}}/>
      </TouchableOpacity>
    );
  }
  

export default class RecipeSearch2 extends React.Component{
    // const [value, onChangeText] = React.useState('Useless Placeholder');
    constructor(props){
        super(props);
        this.state={isLoading: true}
    }

    componentDidMount(){
        return fetch("https://tasty.p.rapidapi.com/recipes/list?tags=under_30_minutes&q=tomato&from=0&sizes=20", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "tasty.p.rapidapi.com",
                "x-rapidapi-key": "78e1a9657bmsh476c3ab509046b2p1ad2ebjsnb617d5219151"
            }
        })
        .then((response)=>response.json())
        .then((responseJson)=>{

            this.setState({
                isLoading: false,
                dataSource: responseJson.results,
            }, function(){

            });
        })
        .catch((error)=>{
            console.error(error);
        });
    }

    render(){
        
        if(this.state.isLoading){
            return(
                <View style={{flex: 1, padding: 20}}>
                    <ActivityIndicator/>
                </View>
            )
        }


        

        return(
            <View style={{flex: 1, padding: 20}}>
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    // onChangeText={text=>onChangeText(text)}
                    // value={value}
                    ></TextInput>
                <FlatList
                    data={this.state.dataSource}

                // // renderItem #1
                //     renderItem={({item})=>
                //     <Text>{item.name}</Text>
                // }

                // // renderItem #2
                // renderItem={(item) => (       
                // <TouchableOpacity
                //     style={{flex: 1, padding: 20}}>
                //     <Text>{item.name}</Text>         
                // </TouchableOpacity>
                // )}
                // <Image source={{uri:'item.thumbnail_url'}}></Image>

                // // renderItem #3
                //    renderItem={this.renderItem}

                // renderItem #4
                renderItem={({ item }) => (
                    <Item
                      id={item.id}
                      title={item.name}
                      img={item.thumbnail_uri}
                      //selected={!!selected.get(item.id)}
                      //onSelect={onSelect}
                    />
                  )}

                keyExtractor={({id},index)=>id}
                />
            </View>
        )
    }

}