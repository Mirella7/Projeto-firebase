import { StyleSheet } from "react-native";

export const estilos = StyleSheet.create({
    botao: {
        position: 'absolute', //Ficar em qualquer lugar da tela
        bottom: 20,
        right: 20,
        width: 150,
        height: 50,
        backgroundColor: 'purple',
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textoBotao: {
        fontSize: 14,
        color: '#FFF',
        fontWeight: '500',
    },
})
