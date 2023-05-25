import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

export default function HeaderTab({activeTab, setActiveTab}) {
  return (
    <View style={{flexDirection: 'row', alignSelf: 'center',marginBottom:20}}>
      <HeaderButton
        text="Burger"
        btnColor="black"
        textColor="white"
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <HeaderButton
        text="Pizza"
        btnColor="white"
        textColor="black"
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <HeaderButton
        text="Pasta"
        btnColor="white"
        textColor="black"
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </View>
  );
}
const HeaderButton = ({text, btnColor, textColor, activeTab, setActiveTab}) => (
  <TouchableOpacity
    style={{
      backgroundColor: activeTab === text ? 'black' : 'white',
      paddingVertical: 6,
      paddingHorizontal: 16,
      borderRadius: 30,
    }}
    onPress={() => setActiveTab(text)}>
    <Text
      style={{
        color: activeTab === text ? 'white' : 'black',
        fontSize: 15,
        fontWeight: '900',
      }}>
      {text}
    </Text>
  </TouchableOpacity>
);
