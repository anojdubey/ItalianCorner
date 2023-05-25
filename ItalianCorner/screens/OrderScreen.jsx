import {View, Text, Image, TouchableOpacity, Button} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
const OrderScreen = () => {
  const [myOrder, setMyOrder] = React.useState([]);
  const navigation = useNavigation();

  const fetchOrder = async () => {
    const response = await fetch('http://10.0.2.2:5000/orders');
    const res = await response.json();
    console.log('res', res);
    setMyOrder(res?.orders);
  };
  React.useEffect(() => {
    fetchOrder();
  }, []);
  if (!myOrder || myOrder.length === 0) {
    return (
      <SafeAreaView>
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
          }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
            }}>
            No Orders Found{' '}
          </Text>
          <Button
            title="Go to Home"
            color={'#f4511e'}
            style={{
              borderRadius: 20,
            }}
            onPress={() => {
              navigation.navigate('Home');
            }}
          />
        </View>
      </SafeAreaView>
    );
  }
  return (
    <View>
      {myOrder?.map((order, index) => (
        <View
          style={{
            borderBottomWidth: 1,
          }}
          key={index}>
          {order?.order?.map((item, index) => (
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 10,
                marginBottom: 10,
                padding: 10,
              }}
              key={index}>
              <Image
                style={{
                  width: '15%',
                  height: 50,
                  borderRadius: 50,
                }}
                source={{uri: item?.image}}
              />
              <View
                style={{
                  width: '75%',
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 20,
                  }}>
                  {item?.title} x {item?.quantity}
                </Text>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 18,
                  }}>
                  Rs{item?.cost}
                </Text>
              </View>
            </View>
          ))}

          <TouchableOpacity
            onPress={() => {
              fetch(`http://10.0.2.2:5000/orders/${order._id}`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                },
              }).then(() => fetchOrder());
            }}
            style={{position: 'absolute', right: 10, top: 10}}>
            <View
              style={{
                backgroundColor: 'red',
                padding: 10,
                borderRadius: 30,
              }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: '#fff',
                }}>
                Cancel Order
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default OrderScreen;
