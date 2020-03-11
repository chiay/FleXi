import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions } from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCogs, faTimes } from '@fortawesome/free-solid-svg-icons';

export default class SettingScreen extends React.Component {
   renderSeparator = () => {
      return (
         <View style={{ 
            height: 1, 
            width: "85%",
            marginLeft: "8%",
            backgroundColor: "#CED0CE" }}/>
      );
   };

   render() {
   return (
      <View style={ styles.container }>
         <View style={ styles.header }>
            <View style={{ flexDirection:"row" }}>
               <FontAwesomeIcon style={{ marginHorizontal: 10, marginTop: 2 }} icon={faCogs} size={25} color="#364f6b"/>
               <Text style={ styles.headerText }>Settings</Text>
            </View>
         </View>
         <FlatList
            data={[
                  {key: 'Rules'},
                  /*{key: 'Notifications'},*/
                  ]}
            renderItem={ ({ item }) => <TouchableOpacity onPress={ () => this.props.navigation.navigate( item.key ) }><Text style={ styles.item }>{ item.key }</Text></TouchableOpacity> }
            ItemSeparatorComponent={ this.renderSeparator }
            keyExtractor={ item => item.key }
         />
      </View>
   )};
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   header: {
      width: "100%",
      height: Dimensions.get("window").height * 0.08,
      backgroundColor: "#f0f0f0",
      alignItems: "center",
      justifyContent: "center",
      borderBottomColor: "#000",
      elevation: 3,
   },
   headerText: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#364f6b",
   },
   item: {
      fontSize: 18,
      marginLeft: 20,
      marginVertical: 10,
   },
});