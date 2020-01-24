import React from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';

const AddEventModal = (props) => (
   <Modal
   visible={ props.display } 
   animationType="fade" 
   presentationStyle="pageSheet"
   onRequestClose={() => { props.closeModal() }} >
      <View>
         <Text>
            { props.data }
         </Text>
      </View>
   </Modal>
)

const styles = StyleSheet.create({
   container: {
      flex: 1,
   }
});

export default AddEventModal;