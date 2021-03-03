import React, { useState, useEffect } from "react";
import axios from "axios";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function PokeInfo(props) {
  let [pokemon, setPokemon] = useState({
    base_happiness: "",
    category: "",
    color: "",
    description: "",
    generation: "",
    habitat: "",
    height: 0,
    id: 0,
    image: "",
    is_baby: false,
    name: "",
    types: "",
    weight: 0,
  });

  let endpoint = "https://pokeapi.co/api/v2";
  let pagePokeId = window.location.href.substring(
    window.location.href.lastIndexOf("/") + 1
  );

  useEffect(() => {
    let firstData = {};
    // get pokemon urls
    axios
      .get(`${endpoint}/pokemon-species/${pagePokeId}`)
      .then((response) => {
        return response.data;
      })
      .then((d) => {
        firstData = {
          name: d.name,
          color: d.color.name,
          generation: d.generation.name,
          is_baby: d.is_baby,
          description: d.flavor_text_entries[6].flavor_text,
          id: d.id,
          category: d.genera[7].genus,
          habitat: d.habitat.name,
          base_happiness: d.base_happiness,
        };
      })
      .catch((error) => {
        console.log(error);
      });

    // Joins data from /pokemon-species with /pokemon
    axios
      .get(`${endpoint}/pokemon/${pagePokeId}`)
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
      .then((d) => {
        setPokemon({
          ...firstData,
          height: d.height/10, //decimeteres to meters
          weight: d.weight/10, // hectograms to grams
          image: d.sprites.front_default,
          types: d.types.map((t, i) => t.type.name).join(" | "),
        });
        
      });
  }, [endpoint, pagePokeId]);



  // const types = pokemon.types.map(t => t.type.name).join(" | ")

  const pokeDetailedInfo = (
    <div>
       <p>
          <strong>Category: </strong>
          {pokemon.category}
        </p>

        <p>
          <strong>Generation: </strong>
          {pokemon.generation}
        </p>
        <p>
          <strong>Habitat: </strong>
          {pokemon.habitat}
        </p>
        <p>
          <strong>Color: </strong>
          {pokemon.color}
        </p>
        <p>
          <strong>Height: </strong>
          {pokemon.height}m / {Number(Math.round(pokemon.height*3.281+"e2")+"e-2")}ft
        </p>
        <p>
          <strong>Weight: </strong>
          {pokemon.weight}g
        </p>
        <p>
          <strong>Description: </strong>
          {pokemon.description}
        </p>
    </div>
  )

  return (
    <Jumbotron fluid key={`pokeinfo${pokemon.id}`}>
      <Container>
        <Row>
        <Col>
        <h1>
          #{pokemon.id} {pokemon.name}
        </h1>
        <h2>
          <strong>Type: </strong>
          {pokemon.types}
        </h2>
        <img
          src={pokemon.image}
          alt={pokemon.name}
          style={{ height: "50vh", width: "auto" }}
        ></img>
        </Col>

        <Col>
       {pokeDetailedInfo}
        </Col>
        </Row>
      </Container>
    </Jumbotron>
  );
}
