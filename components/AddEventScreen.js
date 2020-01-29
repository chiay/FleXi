import React from 'react';
import 
{ 
View, 
Text, 
StyleSheet, 
Dimensions, 
TextInput,
Picker,
Button,
} from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCalendarPlus } from '@fortawesome/free-regular-svg-icons';

export default class AddEventScreen extends React.Component {
   state = {
      title: '',
      type: '',
      time: '',
      location: '',
      description: '',
   };

   render() {
   return (
      <View style={ styles.container }>
         <View style={ styles.header }>
            <View style={{ flexDirection:"row" }}>
               <FontAwesomeIcon style={{ marginHorizontal: 10, marginTop: 2 }} icon={faCalendarPlus} size={25} color="#364f6b"/>
               <Text style={ styles.headerText }>Add to Calendar</Text>
            </View>
         </View>
         <View style={ styles.formContainer }>
            <TextInput style={ styles.txtTitle }
               placeholder="Give me a title..."
            />
            <Text style={ styles.formTitle }>Type</Text>
            <Picker style={ styles.picker }
               selectedValue={ this.state.type }
               onValueChange={ (itemValue) => this.setState({ type: itemValue }) }
            >
               <Picker.Item label="Event" value="Event"/>
               <Picker.Item label="Meeting" value="Meeting"/>
               <Picker.Item label="Task" value="Task"/>
               
            </Picker>
            
            <View style={ styles.separator } />

            <TextInput style={ styles.txtTitle }
               placeholder="Time - eg. 01.00-02.00"
               keyboardType="decimal-pad"
            />
            <View style={ styles.separator } />

            <TextInput style={ styles.txtTitle }
               placeholder="Location"
            />

            <View style={ styles.separator } />

            <TextInput style={ styles.txtTitle }
               placeholder="Description (optional)"
            />

            <View style={ styles.buttonContainer }>
               <View style={ styles.buttonStyle }><Button title="Done" /></View>
               <View style={ styles.buttonStyle }><Button title="Discard" onPress={ () => this.props.navigation.goBack(null) } /></View>
            </View>
         </View>
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
   txtTitle: {
      marginHorizontal: 20,
      fontSize: 20,
      marginTop: 5,
   },
   picker: {
      marginHorizontal: 25,
      marginVertical: 5,
   },
   formTitle: {
      marginHorizontal: 20,
      marginVertical: 5,
      fontSize: 18,
      fontWeight: "bold"
   },
   separator: {
      height: 1,
      width: "85%",
      marginLeft: "8%",
      marginVertical: 5,
      backgroundColor: "#CED0CE"
   },
   buttonContainer: {
      marginTop: 50,
      flexDirection: "row",
      width: Dimensions.get("window").width,
      alignItems: "center",
      justifyContent: "center",
   },
   buttonStyle: {
      marginHorizontal: 10,
      width: Dimensions.get("window").width * 0.3,
   },

});