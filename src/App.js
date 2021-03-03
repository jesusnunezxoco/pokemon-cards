import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import PokeInfo from "./components/PokeInfo";
import Favorites from "./components/Favorites";
import Card from "react-bootstrap/Card";

function App() {
  let endpoint = "https://pokeapi.co/api/v2";
  let [pokeCards, setPokeCards] = useState([
    {
      name: "bulbasaur",
      id: 1,
      image:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
    },
    {
      name: "ivysaur",
      id: 2,
      image:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png",
    },
  ]);
  let [favorite, setFavorite] = useState({ favorite: false });

  useEffect(() => {
    // get pokemon urls
    axios
      .get(`${endpoint}/pokemon?limit=151`)
      .then((response) => {
        setPokeCards(
          response.data.results.map((result, i) => ({
            name: result.name,
            id: i + 1,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
              i + 1
            }.png`,
          }))
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, [endpoint]);

  const cards = pokeCards.map((card) => (
    <Card style={{ width: "18rem" }} key={`Pokecard${card.id}`}>
      <Link to={`/pokemon-species/${card.id}`}>
        <Card.Img variant="top" src={card.image} />
      </Link>
      <Card.Body>
        <Link to={`/pokemon-species/${card.id}`}>
          <Card.Title class="pokeName">
            #{card.id} {card.name}
          </Card.Title>

          <Card.Text></Card.Text>
        </Link>
      </Card.Body>
    </Card>
  ));

  const cardGroupStyles = {
    display: "grid",
    gridTemplateColumns: "auto auto auto",
    alignItems: "center",
    justifyContent: "center",
    gridGap: "1em",
    paddingTop: "1.5em",
    backgroundColor: "#3B4CCA",
    color: "red",
  };

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Search />

            <div style={cardGroupStyles}>{cards}</div>
          </Route>
          <Route path="/favorites" component={Favorites} />
          <Route path="/pokemon-species/:id" component={PokeInfo} />
        </Switch>

        <Navbar />
      </div>
    </Router>
  );
}

export default App;
