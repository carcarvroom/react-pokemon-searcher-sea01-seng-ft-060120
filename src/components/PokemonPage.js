import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import Search from './Search'
import { Container } from 'semantic-ui-react'

class PokemonPage extends React.Component {
  state = {
    allPokemon: [],
    displayedPokemon: []
  }

  componentDidMount() {
    fetch('http://localhost:3000/pokemon')
    .then(res => res.json())
    .then(data => {
      this.setState({
        allPokemon: data,
        displayedPokemon: data
      })
    })
  }

  searchPokemon = (e) => {
    let displayedPokemon = this.state.allPokemon.filter(pokemon => { 
      return pokemon.name.includes(e.target.value)
    })
    this.setState({displayedPokemon})
  }

  addPokemon = (e) => {
    let pokemon = {
      name: e.target.name.value,
      hp: e.target.hp.value,
      sprites: {
        front: e.target.frontUrl.value,
        back: e.target.backUrl.value
      }
    }
    fetch('http://localhost:3000/pokemon', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(pokemon)
    })
    .then(res => res.json())
    .then(newPokemon => {
      this.setState({
        displayedPokemon: [...this.state.displayedPokemon, newPokemon]
      })
    })
  }

  render() {
    let {displayedPokemon} = this.state
    return (
      <Container>
        <h1>Pokemon Searcher</h1>
        <br />
        <PokemonForm addPokemon={this.addPokemon} />
        <br />
        <Search searchPokemon={this.searchPokemon}/>
        <br />
        <PokemonCollection displayedPokemon={displayedPokemon} />
      </Container>
    )
  }
}

export default PokemonPage
