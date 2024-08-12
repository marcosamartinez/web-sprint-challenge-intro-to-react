import React, { useState } from "react";

function Character({ name, homeworld }) {
  // ❗ Add the props
  // ❗ Create a state to hold whether the homeworld is rendering or not
  const [showHomeworld, setShowHomeworld] = useState(false);
  // ❗ Create a "toggle" click handler to show or remove the homeworld
  const toggleHomeworld = () => {
    setShowHomeworld((prevShowHomeworld) => !prevShowHomeworld);
  };
  return (
    <div className="character-card" onClick={toggleHomeworld}>
      <h2 className="character-name">{name}</h2>
      {showHomeworld && (
        <p>
          Homeworld: <span className="character-planet">{homeworld}</span>
        </p>
      )}
    </div>
  );
}

export default Character;
