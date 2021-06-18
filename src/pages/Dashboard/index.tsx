import React, { useEffect, useState }from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import api from '../../services/api'
import { Container, TodosTitulos } from './styles'

//Interface com as informações do cadastro dos titulos
interface CadastroCopa {
  id: string;
  ano: string;
  sede: string;
  campeao: string;
}

//Pagina Principal
const Dashboard: React.FC = () => {

  const [titulos, setTitulos] = useState<CadastroCopa[]>([])
  const [ano, setAno] = useState('')
  const [sede, setSede] = useState('')
  const [campeao, setCampeao] = useState('')

  //Chamar a função useHistory()
  const history = useHistory()

  useEffect(() => {
    buscarTitulos()
  }, [])

  //Apagar os titulos gravados
  async function apagarTitulos(id: string) {
    await api.delete(`/worldcup/${id}`)
    buscarTitulos()
  }

  //Buscar todos os titulos gravados
  async function buscarTitulos() {
    const todosTitulos = await api.get('/worldcup')
    setTitulos(todosTitulos.data)
  }

  //Adicionar os titulos no banco de dados
  async function adicionarTitulos(event: any) {
    event.preventDefault()

    if (!ano.trim() || !sede.trim() || !campeao.trim()) {

      return
    }

    //Chama o metodo post no node pra gravar no banco de dados
    const novoTitulo = await api.post('/worldcup', {
      ano,
      sede,
      campeao
    })

    const { data } = novoTitulo

    setTitulos([...titulos, data])
  }

  return (
    //Container -> Estilização do formulario
    <Container>
    {/*
    Inicio do Formulario de Cadastro chamando a função de adicionar os titulos
    */}
    <form onSubmit={adicionarTitulos}>
      {/* Pegando o dado do Ano e colocando em "setAno" */}
      <input
      type='text'
      name='ano'
      onChange={event => setAno(event.target.value)}
      placeholder='Ano da Copa Mundo' />
      {/* Pegando o dado da Sede e colocando em "setSede" */}
      <input
      type='text'
      name='sede'
      onChange={event => setSede(event.target.value)}
      placeholder='Sede da Copa do Mundo' />

      {/* Pegando o dado do Campeao e colocando em "setCampeao" */}
      <input
      type='text'
      name='campeao'
      onChange={event => setCampeao(event.target.value)}
      placeholder='Campeão Mundial' />

      {/* Botão de Salvar */}
      <button type="submit">Salvar</button>

      {/* Fim do Formulario */}
    </form>
    {/* Estilização dos Titulos gravados */}
    <TodosTitulos>
        {titulos.map(titulo => {
            return (
              <div key={titulo.id}>
                <div>
                  <span>{`Ano da Copa: ${titulo.ano}`}</span>
                  <span>{`Sede da Copa: ${titulo.sede}`}</span>
                  <span>{`Campeão Mundial: ${titulo.campeao}`}</span>
                </div>
                <div>
                  <button onClick={() => {
                    history.push(`/titulo/${titulo.id}`)
                  }}>Alterar</button>
                  <button onClick={() => {
                    apagarTitulos(titulo.id)
                  }}>Deletar</button>
                  <Link to={`/detalhes/${titulo.campeao}`}>
                  <button type="button">Detalhes</button></Link>
                </div>
              </div>
            )
          })}
      </TodosTitulos>
    </Container>
  )
}

export default Dashboard



