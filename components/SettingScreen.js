import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons'

export default class SettingScreen extends React.Component {
   render() {
     return (
       <View style={ styles.container }>
          <FlatList
             data={[
                {key: 'Rules'},
                ]}
             renderItem={({ item }) => <Text style={ styles.item }>{ item.key }</Text>}
          />
       </View>
     );
   }
 }

 const styles = StyleSheet.create({
   container: {
     flex: 1,
   },
   item: {
      fontSize: 18,
   },
 });