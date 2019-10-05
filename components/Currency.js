import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export default class Currency extends React.Component{
  state = {
    url : "http://data.fixer.io/api/latest?access_key=e569cf60cb8aa53b961d16e6b71ef4bc" ,
    baseCurrencies:['currencies']
  }

  componentDidMount(){
    this._url("");
  }

  _url = async (str)=>{
      let data = await fetch(this.state.url + str);
      let jsonData = await data.json();
      if(str === ""){
        let baseCurrenciesNew = [];
        Object.keys(jsonData.rates).map(key => (
          baseCurrenciesNew = [...baseCurrenciesNew, key]
        ));
        this.setState({baseCurrencies: baseCurrenciesNew});
      }else{
        if(jsonData.success == true){
          let data="";
          for(var key in jsonData.rates){
            data = data + key + ": " + jsonData.rates[key] + "\n";
          }
          alert(data)
        }else{
          alert("Sorry for the inconveniance, but currently this currency is not supported.")
        }
      }
  }
  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Select the base currency:</Text>
        <ScrollView>
        {
          this.state.baseCurrencies.map( (item,i) =>{
            return (
              <TouchableOpacity onPress={()=>this._url("&base="+this.state.baseCurrencies[i])}>
              <Text style={styles.text}>{item}</Text>
              </TouchableOpacity>
            )
          })
        }  
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container : {
    flex:1,
  },
  heading:{
    fontSize:30
  },
  text:{
    fontSize: 20,
  }
})