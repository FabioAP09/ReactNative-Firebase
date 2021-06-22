import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList, ActivityIndicator } from 'react-native';
import firebase from './src/firebaseConnection';
import Listagem from './src/components/Listagem';


export default function App() {
  const [peca, setPeca] = useState('');
  const [tamanho, setTamanho] = useState('');
  const [cor, setCor] = useState('');
  const [marca, setMarca] = useState('');
  const [tecido, setTecido] = useState('');
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nome, setNome] = useState('');

  const [user, setUser] = useState('');

  useEffect(() => {
    async function dados() {

      setProdutos([]);

      await firebase.database().ref('produtos').on('value', (snapshoot) => {
        setProdutos([]);

        snapshoot.forEach((childItem) => {
          let data = {
            key: childItem.key,
            peca: childItem.val().peca,
            tamanho: childItem.val().tamanho,
            cor: childItem.val().cor,
            marca: childItem.val().marca,
            tecido: childItem.val().tecido
          };
          setProdutos(oldArray => [...oldArray, data].reverse());
        })
        setLoading(false)
      })
    }
    dados();
  }, []);
  async function cadastrar() {
    if (peca !== '' & tamanho !== '' & cor !== '' & marca !== '' & tecido !== '') {
      let produtos = await firebase.database().ref('produtos');
      let chave = produtos.push().key;

      produtos.child(chave).set({
        peca: peca,
        tamanho: tamanho,
        cor: cor,
        marca: marca,
        tecido: tecido
      });
      alert('Produto Cadastrado com Sucesso!');
      setPeca('');
      setTamanho('');
      setCor('');
      setMarca('');
      setTecido('');
    } else {
      alert("Preencha o formulário!");
    }
  }

  async function cadastrarUsuario() {
    await firebase.auth().createUserWithEmailAndPassword(email, password)

      .then((value) => {
        firebase.database().ref('produtos').child(value.user.uid).set({
          nome: nome
        })
        alert('Usuario Cadastrado com Sucesso!');
        setUser(value.user.email);
        setNome('');
        setEmail('');
        setPassword('');

      })
      .catch((error) => {

        alert('Algo deu errado!');
        return;

      })

  }
  async function logout() {
    await firebase.auth().signOut();
    setUser('');
    alert("Deslogado com Sucesso!");
  }
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Peça:</Text>
      <TextInput
        style={styles.input}
        underlineColorAndroid='transparent'
        onChangeText={(texto) => setPeca(texto)}
        value={peca}
      />
      <Text style={styles.texto}>Tamanho:</Text>
      <TextInput
        style={styles.input}
        underlineColorAndroid='transparent'
        onChangeText={(texto) => setTamanho(texto)}
        value={tamanho}
      />
      <Text style={styles.texto}>Cor:</Text>
      <TextInput
        style={styles.input}
        underlineColorAndroid='transparent'
        onChangeText={(texto) => setCor(texto)}
        value={cor}
      />
      <Text style={styles.texto}>Marca:</Text>
      <TextInput
        style={styles.input}
        underlineColorAndroid='transparent'
        onChangeText={(texto) => setMarca(texto)}
        value={marca}
      />
      <Text style={styles.texto}>Tecido:</Text>
      <TextInput
        style={styles.input}
        underlineColorAndroid='transparent'
        onChangeText={(texto) => setTecido(texto)}
        value={tecido}
      />
      <Button
        title="Novo Cadastro"
        onPress={cadastrar}
      />
      {
        loading ?
          (
            <ActivityIndicator color="#121212" size={45} />
          ) : (
            <FlatList
              keyExtractor={item => item.key}
              data={produtos}
              renderItem={({ item }) => (<Listagem data={item} />)}
            />
          )
      }


      <View>
        <View style={styles.texto}>Logar</View>
        <Text style={styles.texto}>Nome:</Text>
        <TextInput
          style={styles.input}
          underlineColorAndroid='transparent'
          onChangeText={(texto) => setNome(texto)}
          value={nome}
        />
        <Text style={styles.texto}>E-mail:</Text>
        <TextInput
          style={styles.input}
          underlineColorAndroid='transparent'
          onChangeText={(texto) => setEmail(texto)}
          value={email}
        />
        <Text style={styles.texto}>Senha:</Text>
        <TextInput
          style={styles.input}
          underlineColorAndroid='transparent'
          onChangeText={(texto) => setPassword(texto)}
          value={password}
        />
        <Button
          title="Cadastrar"
          onPress={cadastrarUsuario}
        />
        <Text style={{ marginTop: 20, marginBottom: 20, fontSize: 23, textAlign: 'center' }}>
          Usuário Autenticado: {user}
        </Text>
        <Button
          title="Sair"
          onPress={logout}
        />

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    flex: 1
  },
  texto: {
    fontSize: 20,

  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#121212',
    height: 45,
    fontSize: 17
  }
});
