import React, { useEffect, useState } from "react";
import axios from "axios";
import Character from "./Character";

const urlPlanets = "http://localhost:9009/api/planets";
const urlPeople = "http://localhost:9009/api/people";

function App() {
  // ❗ Create state to hold the data from the API
  const [characters, setCharacters] = useState([]);
  const [planets, setPlanets] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // ❗ Create effects to fetch the data and put it in state
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch characters
        const peopleResponse = await axios.get(urlPeople);
        const characterData = peopleResponse.data;

        // Fetch planets
        const planetsResponse = await axios.get(urlPlanets);
        const planetData = planetsResponse.data;

        // Map planets by their ID for easy lookup
        const planetMap = {};
        planetData.forEach((planet) => {
          planetMap[planet.id] = planet.name;
        });

        // Set the data in state
        setCharacters(characterData);
        setPlanets(planetMap);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  console.log("Characters State:", characters);
  console.log("Planets State:", planets);

  return (
    <div>
      <h2>Star Wars Characters</h2>
      <div>
        {characters.map((character) => (
          <Character
            key={character.id}
            name={character.name}
            homeworld={planets[character.homeworld]}
          />
        ))}
      </div>
      <p>
        See the README of the project for instructions on completing this
        challenge
      </p>
    </div>
  );
}

export default App;

// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== "undefined" && module.exports) module.exports = App;
