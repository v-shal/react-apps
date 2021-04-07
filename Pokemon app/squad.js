import React, { Component } from "react";
import PropTypes from "prop-types";
import "./pokemon.css";

class Squad extends Component {
  render() {
    console.log("squad props", this.props);
    // console.log("move", this.props.move);
    return (
      <div>
        <p className="subtitle">Selected Squad</p>
        <div className="card-container">
          {this.props.squad.map((pokCard, index) =>
            pokCard.name !== "" ? (
              <div className="pok-card" key={index}>
                <img
                  className="pok-image squad-image"
                  src={pokCard.imageUrl}
                  alt={pokCard.name}
                />
                <p>
                  {pokCard.name.charAt(0).toUpperCase() + pokCard.name.slice(1)}
                </p>
                <p className="pok-move">
                  {pokCard.move.charAt(0).toUpperCase() + pokCard.move.slice(1)}
                </p>
              </div>
            ) : (
              <div className="empty-card" key={index}>
                <p>Empty</p>
              </div>
            )
          )}
        </div>
      </div>
    );
  }
}

Squad.propTypes = {
  squad: PropTypes.arrayOf(
    PropTypes.shape({
      imageUrl: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      move: PropTypes.string.isRequired,
    })
  ),
};

export default Squad;
