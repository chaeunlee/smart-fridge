import React from 'react';
import {
    StyleSheet,
    View,
    ActivityIndicator,
    FlatList,
    Text,
    TouchableOpacity,
    TextInput
} from "react-native";

export default class Recipesearch extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isloading:true,
            dataSource:[]
        };
    }
    // fetch -> request & response
    componentDidMount(){
        return fetch("https://tasty.p.rapidapi.com/recipes/list?tags=under_30_minutes&q=tomato&from=0&sizes=20", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "tasty.p.rapidapi.com",
                "x-rapidapi-key": "42a2000a47msh9dad0825cebaabep12f997jsn71d0b798fd3a"
            }
        })
        .then((response) => response.json())
        .then((responseJson)=>
             {
            this.setState({
                isloading: false,
                dataSource: responseJson.results
            })
            return responseJson;
        })
        .catch(err => { //to catch error
            console.log(err);
        })
    }
    //request



    FlatListItemSeparator = () => {
        return (
          <View style={{
             height: .9,
             width:"100%",
             backgroundColor:"rgba(0,0,0,0.5)",
        }}
        />
        );
        }

    
        // renderItem=(data)=>
        // <TouchableOpacity style={styles.list}>
        // <Text style={{fontWeight: 'bold'}}>Recipe Name</Text>
        // <Text style={styles.lightText} >{data.name}</Text>
        // <Text style={{fontWeight:'bold'}}>keyword</Text>
        // <Text style={styles.lightText}>{data.keywords}</Text>
        // </TouchableOpacity>
    
    
    //render
    render(){

        if(this.state.loading){
            return(
                <View style={{flex: 1, paddingTop: 20}}> 
                    <ActivityIndicator size="large" color="#0c9"/>
                </View>
       )}
       
        return(
            
            <View style={{flex: 1, paddingTop: 20}}>
            <TextInput
                sytle={{height: 40}}
                placeholder={(text) => this.setState({text})}/>
                
            <FlatList
                //ItemSeparatorComponent = {this.FlatListItemSeparator}
                data= {this.state.dataSource}
                renderItem={({item})=><Text>{item.name,item.keyword}</Text>}
                //renderItem= {({item})=> this.renderItem(item)}
                keyExtractor= {item=>item.id.toString()}
                />
            </View>
           )
       
        }
       }

       

const styles = StyleSheet.create({
    list:{
      paddingVertical: 4,
      margin: 5,
      backgroundColor: "#fff"
     }
  });
  
