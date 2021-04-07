import React, { Component } from "react";
import "./pokemon.css";
import PropTypes from "prop-types";

class PokemonDetails extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // console.log("props", this.props);
    const { selectedPokemon, selectedPokemonDetails } = this.props;

    return (
      <div>
        <div className="wrapper">
          <img
            src={selectedPokemon.imageUrl}
            alt={selectedPokemon.name}
            className="pok-image"
          />
          <p className="subtitle">{selectedPokemon.name}</p>
        </div>
        <div className="table-div">
          <table className="stat-table">
            <thead>
              <tr>
                <th>Stats</th>
                <th>Value</th>
              </tr>
              <tr>
                <td>hp</td>
                <td>{selectedPokemonDetails.hp}</td>
              </tr>
              <tr>
                <td>attack</td>
                <td>{selectedPokemonDetails.attack}</td>
              </tr>
              <tr>
                <td>defence</td>
                <td>{selectedPokemonDetails.defence}</td>
              </tr>
              <tr>
                <td>specialAttack</td>
                <td>{selectedPokemonDetails.specialAttack}</td>
              </tr>
              <tr>
                <td>specialDefence</td>
                <td>{selectedPokemonDetails.specialDefence}</td>
              </tr>
              <tr>
                <td>speed</td>
                <td>{selectedPokemonDetails.speed}</td>
              </tr>
            </thead>
          </table>
        </div>
        <button onClick={this.props.addPokemon} className="add-pokemon-btn">
          <b>Add Pokemon</b>
        </button>
      </div>
    );
  }
}

PokemonDetails.propTypes = {
  selectedPokemon: PropTypes.shape({
    imageUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
  selectedPokemonDetails: PropTypes.shape({
    hp: PropTypes.number.isRequired,
    attack: PropTypes.number.isRequired,
    defence: PropTypes.number.isRequired,
    specialAttack: PropTypes.number.isRequired,
    specialDefence: PropTypes.number.isRequired,
    speed: PropTypes.number.isRequired,
  }),
};

export default PokemonDetails;
