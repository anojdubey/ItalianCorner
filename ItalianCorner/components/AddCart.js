import {View, Text} from 'react-native';
import {Checkbox} from 'react-native-paper';

import React from 'react';

const AddCart = ({setCartItems, food, cartItems}) => {
  const [checked, setChecked] = React.useState(false);
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <Checkbox
        testID={food.title}
        status={checked ? 'checked' : 'unchecked'}
        onPress={() => {
          setChecked(!checked);
          if (!checked) {
            setCartItems([
              ...cartItems,
              {...food, quantity: 1, total: food.cost},
            ]);
            return;
          } else {
            const newCartItems = cartItems.filter(item => item !== food);
            setCartItems(newCartItems);
            return;
          }
        }}
        color="green"
      />

      <Text
        style={{
          fontWeight: 'bold',
        }}>
        ADD
      </Text>
    </View>
  );
};

export default AddCart;
