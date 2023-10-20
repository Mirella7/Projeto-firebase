import { View, TouchableOpacity, Text, Alert } from "react-native";
import { TextInput, HelperText } from 'react-native-paper';
import { estilos } from "./estilos";
import { useState } from "react";
import { cadastrarProdutos, atualizarProdutos } from "../../servicos/firestore";

export function ManterProdutos({ navigation, route }) {
    const [nomeFilme, setNomeFilme] = useState(route?.params?.nomeFilme)
    const [avaliacaoFilme, setAvaliacaoFilme] = useState(route?.params?.avaliacaoFilme)
    const [statusErro, setStatusErro] = useState('')
    const [mensagemErro, setMensagemErro] = useState('')
    async function salvarProduto() {
        if (nomeFilme == '') {
            setStatusErro('Descricao')
            setMensagemErro('O campo não pode ser vazio')
        } else if (avaliacaoFilme == '') {
            setStatusErro('Preco')
            setMensagemErro('O filme deve ter uma avaliação')
        } else {
            setStatusErro('')
            let resultado = ''
            if (route?.params) {
                resultado = await atualizarProdutos(route?.params?.id, { nomeFilme, avaliacaoFilme })
            }
            else {
                resultado = await cadastrarProdutos({ nomeFilme, avaliacaoFilme})
            }
            if (resultado == 'erro') {
                Alert.alert('Erro ao cadastrar produto')
            } else {
                setNomeFilme('')
                setAvaliacaoFilme('')
                navigation.goBack()
            }
        }
    }
    return (
        <View style={estilos.container}>
            <TextInput
                label="Digite o nome do filme:"
                value={nomeFilme}
                onChangeText={setNomeFilme}
                mode="outlined"
                error={statusErro == 'Descricao'}
                style={estilos.input} />
            {statusErro == 'Descricao' ? <HelperText type="error" visible={statusErro == 'Descricao'}>
                {mensagemErro}
            </HelperText> : null}
            <TextInput
                label="Como você classifica esse filme?"
                value={avaliacaoFilme}
                onChangeText={setAvaliacaoFilme}
                mode="outlined"
                style={estilos.input} />
            {statusErro == 'Preco' ? <HelperText type="error" visible={statusErro == 'Preco'}>
                {mensagemErro}
            </HelperText> : null}
            <TouchableOpacity
                style={estilos.botao} onPress={() => salvarProduto()}>
                <Text style={estilos.texto}>Cadastrar</Text>
            </TouchableOpacity>
        </View>
    )
}