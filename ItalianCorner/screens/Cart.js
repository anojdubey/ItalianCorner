import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import AddCart from '../components/AddCart';
import AddOrder from './AddOrder';
import RazorpayCheckout from 'react-native-razorpay';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
const Cart = ({route, navigate}) => {
  const [orderItems, setOrderItems] = React.useState([
    ...route.params.cartItems,
  ]);
  const [paymentData, setPaymentData] = React.useState();
  const [totalOrder, setTotalOrder] = React.useState(0);
  const navigation = useNavigation();
  React.useEffect(() => {
    var total = 0;
    orderItems.forEach(item => {
      total += item.total;
    });
    setTotalOrder(total);
  }, [orderItems]);
  const handleSuccess = async paymentId => {
    const response = await fetch('http://10.0.2.2:5000/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        razorpay_payment_id: paymentId,
        order: [...orderItems],
      }),
    });
    const data = await response.json();
    console.log('data added');
    if (data?.message === 'Order added successfully') {
      navigation.navigate('OrderScreen');
    }
  };
  const paymentHandler = async () => {
    var options = {
      description: 'Credits towards consultation',
      image: 'https://i.imgur.com/3g7nmJC.png',
      currency: 'INR',
      key: 'rzp_test_TQc6X6C8nCEdST',
      amount: (totalOrder * 100).toString(),
      name: 'Anoj Dubey',
      prefill: {
        email: 'anojadubey@gmail.com',
        contact: '8652477995',
        name: 'Anoj Corp',
      },
      theme: {color: '#F37254'},
    };
    await RazorpayCheckout.open(options)
      .then(data => {
        // handle success
        setPaymentData(data);
        handleSuccess(data.razorpay_payment_id);
      })
      .catch(error => {
        // handle failure
        alert(`Error: ${error.code} | ${error.description}`);
      });
  };
  console.log(paymentData);
  return (
    <SafeAreaView>
      <View>
        {route.params.cartItems.map((item, index) => (
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              margin: 10,
              padding: 10,
              borderBottomWidth: 1,
            }}
            key={index}>
            <View>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                }}>
                {item.title}
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: '600',
                }}>
                {item.cost}
              </Text>
            </View>
            <AddOrder
              item={item}
              orderItems={orderItems}
              setOrderItems={setOrderItems}
            />
          </View>
        ))}
        <TouchableOpacity onPress={() => paymentHandler()}>
          <View
            style={{
              display: 'flex',
              width: '50%',
              alignSelf: 'center',
              borderRadius: 50,
              padding: 10,
              backgroundColor: '#f4511e',
            }}>
            <Text
              style={{
                fontSize: 16,
                color: '#fff',
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              Place Order for : {totalOrder}Rs
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Cart;
