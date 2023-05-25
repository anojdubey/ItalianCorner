import {View, Text, Touchable, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';

const AddOrder = ({item, orderItems, setOrderItems}) => {
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(item.cost);

  useEffect(() => {
    setTotal(item.cost * (quantity + 1));
    const newOrderItems = orderItems.filter(
      orderItem => orderItem._id !== item._id,
    );
    setOrderItems([
      ...newOrderItems,
      {...item, quantity: quantity, total: total},
    ]);
  }, [quantity]);
  console.log('orderItems', orderItems);

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: 70,
        borderWidth: 1,
        borderRadius: 50,
      }}>
      <TouchableOpacity
        disabled={quantity === 1}
        style={{
          borderRightWidth: 1,
          paddingLeft: 5,
          paddingRight: 5,
        }}
        onPress={() => {
          setQuantity(quantity - 1);
        }}>
        <Text style={{fontSize: 24, fontWeight: '700'}}>-</Text>
      </TouchableOpacity>
      <View
        style={{
          backgroundColor: '#f00',
          borderRadius: 50,
          width: 20,
          height: 20,
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: 5,
          marginRight: 5,
        }}>
        <Text
          style={{
            color: '#fff',
            fontWeight: 'bold',
          }}>
          {quantity}
        </Text>
      </View>
      <TouchableOpacity
        style={{
          borderLeftWidth: 1,
          paddingLeft: 5,
          paddingRight: 5,
        }}
        onPress={() => {
          setQuantity(quantity + 1);
        }}>
        <Text style={{fontSize: 24, fontWeight: '700'}}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddOrder;
