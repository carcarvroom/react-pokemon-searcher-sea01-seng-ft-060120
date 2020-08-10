import React from 'react'
import { Card } from 'semantic-ui-react'

class PokemonCard extends React.Component {
  state = {
    front: true
  }

  handleClick = () => {
    this.state.front ? this.setState({front: false}) : this.setState({front: true}) 
  }

  render() {
    let {name, hp, sprites} = this.props.pokemon
    let {front, back} = sprites
    return (
      <Card>
        <div>
          <div className="image" onClick={this.handleClick}>
            <img src={this.state.front ? front : back} alt='front' />
          </div>
          <div className="content">
            <div className="header">{name}</div>
          </div>
          <div className="extra content">
            <span>
              <i className="icon heartbeat red" />
              {hp}
            </span>
          </div>
        </div>
      </Card>
    )
  }
}

export default PokemonCard
