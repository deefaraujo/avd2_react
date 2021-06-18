import React, { useEffect, useState } from 'react'
import api from '../../services/api'
import { useHistory, useParams } from 'react-router-dom'
import { Container } from './styles'


const Update: React.FC = () => {
  const [ano, setAno] = useState('')
  const [sede, setSede] = useState('')
  const [campeao, setCampeao] = useState('')

  const { id } = useParams<{ id:string }>()

  //Chama a função useHistory()
  const history = useHistory()

  useEffect(() => {
    buscarTituloID(id)
  }, [])

  //Buscar um titulo pelo ID no banco de dados usando o metodo GET
  async function buscarTituloID(id: string) {
    const buscarTituloID = await api.get(`/worldcup/${id}`)
    setAno(buscarTituloID.data.ano)
    setSede(buscarTituloID.data.sede)
    setCampeao(buscarTituloID.data.campeao)
  }

  //Altera o titulo gravado no banco de dados usando o metodo PUT
  async function alterarTitulo(event: any) {
    event.preventDefault()
    if (!ano.trim() || !sede.trim() || !campeao.trim()) {
      return
    }
    await api.put(`/worldcup/${id}`, {
      ano,
      sede,
      campeao
    })

    history.push('/')
  }

  return (
    <Container>
      <form onSubmit={alterarTitulo}>
        <input
          type='text'
          name='ano'
          defaultValue={ano}
          onChange={event => setAno(event.target.value)}
          placeholder='Ano: ' />
        <input
          type='text'
          name='sede'
          value={sede}
          onChange={event => setSede(event.target.value)}
          placeholder='Sede: ' />
        <input
          type='text'
          name='campeao'
          value={campeao}
          onChange={event => setCampeao(event.target.value)}
          placeholder='Campeão: ' />
        <button type='submit'>Atualizar</button>
        <button type='button' onClick={() => {
          history.push('/')
        }}>Voltar</button>
      </form>
    </Container>
  )
}

export default Update
