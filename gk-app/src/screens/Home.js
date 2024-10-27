
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const Home = ({ navigation }) => {
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <ImageBackground style={styles.background} source={{uri:'https://images.pexels.com/photos/1906794/pexels-photo-1906794.jpeg?auto=compress&cs=tinysrgb&w=600'}}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: 'https://s3-alpha-sig.figma.com/img/4d17/f963/f6ee0953600008083c32857b2d79ab5e?Expires=1730073600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hS-ZlesIgOFsNI5TzKLXkZNFNd30uIpua1HUhRhIbtBCswHqgN3RenDxUmffeBVTigaFKAneh-4gUSJv2RiFFxfitfJujxSxJQEr2NKXHI4YTVsdVEIRolkIghXgOOngwgFgAiOBvMqI1QZOvqY4aF~SWJemmW6jsCCZvoKZvFmdOY-JON7u6PIX1AC3HUbTmHbp7N3-0R5SZsccTBPMOcDGrDtauJrQUwyT9vmPgmE0eqyBCbdZW1Sm-XMz2UYGHzENW29Q~eVJl4B~iA3Uo7sJv1KoG4D0pSa9-jPly8UCXNY0uycWzvgSktSEe-WsNTqlKACVmOq38s9GRRtKmQ__' }}
            style={styles.image}
          />
          <Text style={styles.quote}>
            "The palest ink is better than the best memory."{"\n"}- Chinese Proverb
          </Text>
        </View>

        <Text style={styles.title}>MANAGE YOUR TASK</Text>

        <View style={styles.inputContainer}>
          <Icon name="mail" size={20} color="#999" style={styles.icon} />
          <TextInput
            placeholder="Enter your email"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="lock" size={20} color="#999" style={styles.icon} />
          <TextInput
            placeholder="Enter your password"
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={passwordVisible}
          />
          <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
            <Icon
              name={passwordVisible ? "eye-off" : "eye"}
              size={20}
              color="#999"
              style={styles.eyeIcon}
            />
          </TouchableOpacity>

        </View>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Task', {email, password})}>
          <Text style={styles.buttonText}>GET STARTED <Icon name="arrow-right" size={16} /></Text>
        </TouchableOpacity>
      </View>
      
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: 'rgba(255, 255, 255, 0)',

  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  quote: {
    fontStyle: 'italic',
    fontWeight: 'bold',
    textDecorationLine: 'line-through',
    // textDecorationLine: 'underline',
    fontSize: 14,
    color: '#999',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#7F00FF',
    marginVertical: 30,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    padding: 5,
  },
  icon: {
    paddingHorizontal: 10,
  },
  eyeIcon: {
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    // borderWidth: 2,
    padding: 10,
  },
  button: {
    backgroundColor: '#00BFFF',
    padding: 5,
    borderRadius: 20,
    width: '60%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#999',

    margin: 20,

  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    padding: 10,


    marginLeft: 10,
  },
});

export default Home;