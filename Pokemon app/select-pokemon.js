import React, { Component, Fragment } from "react";
import axios from "axios";
import "./pokemon.css";
import Pokemon_Logo from "./Pokemon_logo.png";
import Squad from "./squad";
import PokemonDetails from "./pokemon-detail";

class SelectPokemon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemons: [],
      selectedPokemon: { name: "", imageUrl: "", move: "" },
      selectedPokemonDetails: {},
      squad: [],
      count: 0,
      showPokemon: false,
      activeSuggestion: 0,
      filterSuggestion: [],
      showSuggestion: false,
      userInput: "",
    };
  }

  componentDidMount() {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=200&offset=200")
      .then((poks) => {
        const pokemon = poks.data.results;
        this.setState({ pokemons: pokemon });
      });
  }

  onChange = (event) => {
    const { pokemons } = this.state;
    const userInput = event.target.value;

    const filterSuggestion = pokemons.filter(
      (suggestion) =>
        suggestion.name.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    this.setState({
      activeSuggestion: 0,
      filterSuggestion,
      showSuggestion: true,
      userInput: event.target.value,
    });
  };

  onClick = (event) => {
    const pokIndex = this.state.pokemons.findIndex(
      (i) => i.name === event.currentTarget.innerText
    );

    const tempObj = {
      name: event.currentTarget.innerText,
      imageUrl: "",
      move: "",
    };

    let selectedSquad = { ...this.state.selectedSquad };

    const tempDetails = {
      hp: "",
      attack: "",
      defence: "",
      specialAttack: "",
      specialDefence: "",
      speed: "",
    };
    axios.get(this.state.pokemons[pokIndex].url).then((poks) => {
      tempObj.imageUrl = poks.data.sprites.front_default;
      console.log("poks", poks);

      tempObj.move = poks.data.moves[0].move.name;
      console.log("move", tempObj.move);
      tempDetails.hp = poks.data.stats[0].base_stat;
      tempDetails.attack = poks.data.stats[1].base_stat;
      tempDetails.defence = poks.data.stats[2].base_stat;
      tempDetails.specialAttack = poks.data.stats[3].base_stat;
      tempDetails.specialDefence = poks.data.stats[4].base_stat;
      tempDetails.speed = poks.data.stats[5].base_stat;

      this.setState(
        {
          activeSuggestion: 0,
          filterSuggestion: [],
          showSuggestion: false,
          userInput: tempObj.name,
          selectedPokemon: tempObj,
          showPokemon: true,
          selectedSquad: { ...selectedSquad, ...tempObj },
          selectedPokemonDetails: tempDetails,
        },
        () => {
          console.log("state", this.state.selectedPokemon);
        }
      );

      // console.log(poks.data.sprites.front_default);
    });

    console.log(tempObj, "tempobj");
  };

  addPokemon = () => {
    if (this.state.squad.length < 6) {
      let pokSuqad = [...this.state.squad];
      let pokObject = {};
      const found = pokSuqad.some(
        (el) => el.name === this.state.selectedPokemon.name
      );
      if (!found) {
        pokObject.name = this.state.selectedPokemon.name;
        pokObject.imageUrl = this.state.selectedPokemon.imageUrl;
        pokObject.move = this.state.selectedPokemon.move;
        pokSuqad.push(pokObject);
      }

      this.setState({ squad: pokSuqad, count: this.state.count + 1 });
    }
  };

  onKeyDown = (event) => {
    const { activeSuggestion, filterSuggestion } = this.state;

    if (event.keyCode === 13) {
      this.setState({
        activeSuggestion: 0,
        showSuggestion: false,
        userInput: filterSuggestion[activeSuggestion],
      });
    } else if (event.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }
      this.setState({ activeSuggestion: activeSuggestion - 1 });
    } else if (event.keyCode === 40) {
      if (activeSuggestion - 1 === filterSuggestion.length) {
        return;
      }
      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };

  render() {
    const {
      activeSuggestion,
      showSuggestion,
      filterSuggestion,
      userInput,
      showPokemon,
    } = this.state;
    const { onChange, onClick, onKeyDown } = this;

    // console.log("state", this.state);

    let suggestionListComponent;
    if (showSuggestion && userInput) {
      if (filterSuggestion.length) {
        suggestionListComponent = (
          <ul className="suggestions">
            {filterSuggestion.map((suggestion, index) => {
              let className;
              if (index === activeSuggestion) {
                className = "suggestion-active";
              }
              return (
                <li
                  className={className}
                  key={suggestion.name}
                  onClick={onClick}
                >
                  {suggestion.name}
                </li>
              );
            })}
          </ul>
        );
      } else {
        suggestionListComponent = (
          <div className="no-suggestion">
            <em>No Pokemons available of this name.</em>
          </div>
        );
      }
    }
    return (
      <div>
        <img src={Pokemon_Logo} alt="Polemon Logo" className="pokemon-logo" />
        <p className="subtitle">
          <b>Select a Pokemon...</b>
        </p>
        <Fragment>
          <input
            type="text"
            placeholder="Search Pokemon..."
            value={userInput}
            onChange={onChange}
            onKeyDown={onKeyDown}
          />
          {suggestionListComponent}
        </Fragment>
        <div className="selected-pokemon">
          {/* <PokemonDetails
            selectedPokemon={this.state.selectedPokemon}
            selectedPokemonDetails={this.state.selectedPokemonDetails}
            showPokemon={this.state.showPokemon}
            selectedSquad={this.state.selectedSquad}
            addPokemon={this.addPokemon}
          /> */}
          <ShowPokemon
            showPokemon={showPokemon}
            selectedPokemon={this.state.selectedPokemon}
            selectedPokemonDetails={this.state.selectedPokemonDetails}
            showPokemon={this.state.showPokemon}
            selectedSquad={this.state.selectedSquad}
            addPokemon={this.addPokemon}
          />
        </div>
        <Squad squad={this.state.squad} />
      </div>
    );
  }
}

export default SelectPokemon;

function ShowPokemon(props) {
  if (props.showPokemon) {
    return (
      <PokemonDetails
        selectedPokemon={props.selectedPokemon}
        selectedPokemonDetails={props.selectedPokemonDetails}
        showPokemon={props.showPokemon}
        selectedSquad={props.selectedSquad}
        addPokemon={props.addPokemon}
      />
    );
  } else {
    return <h3 className="subtitle">Pokemon not selected</h3>;
  }
}
