import React, { useState, useEffect } from 'react'
import { useRouteMatch } from 'react-router-dom'
import api from '../../services/api'
import { Container, Titulos } from './styles'

interface CampeaoParametros {
  campeao: string
}

interface Cadastro {
  ano: string;
  sede: string;
  campeao: string;
}

const Details: React.FC = () => {
  const { params } = useRouteMatch<CampeaoParametros>()

  const [campeao, setCampeao] = useState<Cadastro[]>([])

  useEffect(() => {
    api.get('/worldcup').then(response => setCampeao(response.data))
  }, [])


  let detalhesCampeao = []
  detalhesCampeao = campeao.filter(titulo => titulo.campeao === params.campeao)
  console.log(detalhesCampeao)
  return (
    <Container>
      <Titulos>
        <ul>
          {detalhesCampeao.map((titulo, index) =>
            <li key={index}>
              <span>Campeão Mundial: {titulo.campeao}</span>
              <span>Ano: {titulo.ano}</span>
              <span>Sede: {titulo.sede}</span>
            </li>
          )}
        </ul>
      </Titulos>
    </Container>
  )
}

export default Details
