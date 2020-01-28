import React from 'react';
import { Modal, View, Text, StyleSheet, Dimensions } from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCalendarPlus } from '@fortawesome/free-regular-svg-icons';

const AddEventModal = (props) => (
   <Modal
   visible={ props.display } 
   animationType="fade" 
   presentationStyle="pageSheet"
   onRequestClose={() => { props.closeModal() }} >
      <View style={ styles.container }>
         <View style={ styles.header }>
            <View style={{ flexDirection:"row" }}>
               <FontAwesomeIcon style={{ marginHorizontal: 10, marginTop: 2 }} icon={faCalendarPlus} size={25} color="#364f6b"/>
               <Text style={ styles.headerText }>Add to Calendar</Text>
            </View>
         </View>
         <Text>
            { props.data }
         </Text>
      </View>
   </Modal>
)

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
});

export default AddEventModal;