import React from 'react';
import { Radar } from 'react-chartjs';
import { Button } from 'react-bootstrap/lib/';

let capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const PokemonDetai = ({pokemon, clickBack}) => {
  if (pokemon !== null) {
    const labels = pokemon.stats.map((info) => {
      return capitalize(info.stat.name);
    });

    const data = pokemon.stats.map((info) => {
      return info.base_stat;
    });

    let chartData = {
      labels: labels,
      datasets: [
        {
          data: data,
          fillColor: "rgba(255,99,132,0.2)",
          strokeColor: "rgba(255,99,132,1)",
          pointColor: "rgba(255,99,132,1)",
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: "rgba(255,99132,1)"
        }
      ]
    };
    return (
      <div className="poke-detail">
        <div><h1>{capitalize(pokemon.name)}</h1></div>
        <div>
        <img className="" src={pokemon.sprites.front_default} alt="pokemon front" />
        <Radar className="" data={chartData} width="300" height="250" />
        <Button bsStyle="primary" onClick={clickBack.bind(null)} className='btn-info-2'>Back</Button>
        </div>
      </div>
    )
  } else {
    return (
      <div></div>
    )
  }
}


export default PokemonDetai;
