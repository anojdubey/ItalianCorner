import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Button,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import HeaderTab from '../components/HeaderTab';
import {SafeAreaView} from 'react-native-safe-area-context';
import AddOrder from './AddOrder';
import AddCart from '../components/AddCart';
import {useNavigation} from '@react-navigation/native';

const HomeScreen = () => {
  const [activeTab, setActiveTab] = useState('Burger');

  const [cartItems, setCartItems] = useState([]);
  const navigation = useNavigation();

  const [mapData, setMapData] = useState([]);

  const fetchFood = async () => {
    const response = await fetch('http://10.0.2.2:5000');
    const res = await response.json();
    setMapData(res?.foods);
  };

  // useEffect(() => {
  //   setMapData(
  //     activeTab === 'Burger' ? burger : activeTab === 'Pasta' ? pasta : pizza,
  //   );
  // }, [activeTab]);
  console.log(cartItems);
  useEffect(() => {
    fetchFood();
  }, []);
  if (!mapData || mapData.length === 0) {
    return (
      <View>
        <Text>Loading ....</Text>
      </View>
    );
  }
  return (
    <SafeAreaView>
      <ScrollView
        style={{
          marginTop: 20,
        }}>
        <SafeAreaView>
          <HeaderTab activeTab={activeTab} setActiveTab={setActiveTab} />
          <ScrollView>
            {mapData?.map((food, index) => (
              <TouchableOpacity
                key={index}
                activeOpacity={1}
                style={{
                  marginBottom: 0,
                  display: food.type == activeTab ? 'flex' : 'none',
                }}>
                <View
                  key={index}
                  nativeID={food._id}
                  style={{
                    marginTop: 10,
                    padding: 15,
                    backgroundColor: '#eee',
                  }}>
                  <Image
                    source={{uri: food?.image}}
                    style={{
                      width: '100%',
                      height: 180,
                    }}
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: 10,
                    }}>
                    <View
                      style={{
                        display: 'flex',
                        width: '100%',
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingLeft: 7,
                        paddingRight: 7,
                      }}>
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: '900',
                          color: 'black',
                        }}>
                        {food.title}
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: 'gray',
                        }}>
                        {food?.cost}Rs
                      </Text>
                      <AddCart
                        cartItems={cartItems}
                        food={food}
                        setCartItems={setCartItems}
                      />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
            {cartItems?.length > 0 && (
              <View style={{flex: 1}}>
                <Button
                  title="Go to Cart"
                  onPress={() => {
                    navigation.navigate('Cart', {cartItems: [...cartItems]});
                  }}
                  color={'#f4511e'}
                />
              </View>
            )}
          </ScrollView>
        </SafeAreaView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
