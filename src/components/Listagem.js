import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


export default function Listagem({ data }) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                Peça:{data.peca}
            </Text>
            <Text style={styles.text}>
                Tamanho: {data.tamanho}
            </Text>
            <Text style={styles.text}>
                Cor:{data.cor}
            </Text>
            <Text style={styles.text}>
                Marca:{data.marca}
            </Text>
            <Text style={styles.text}>
                Tecido:{data.tecido}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        marginBottom: 10,
        padding: 10,
        backgroundColor: 'orange'
    },
    text: {
        color: '#222',
        fontSize: 17
    }
})