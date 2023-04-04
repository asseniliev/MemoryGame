import { useState, useEffect } from "react";
import Card from "./Card";
import styles from "../styles/Home.module.css";

function Home() {
  const deck = [
    { id: 1, name: "billiard ball", image: "/billiardball.svg" },
    { id: 2, name: "billiard ball", image: "/billiardball.svg" },
    { id: 3, name: "bubble tea", image: "/bubbletea.svg" },
    { id: 4, name: "bubble tea", image: "/bubbletea.svg" },
    { id: 5, name: "cactus", image: "/cactus.svg" },
    { id: 6, name: "cactus", image: "/cactus.svg" },
    { id: 7, name: "dog", image: "/dog.svg" },
    { id: 8, name: "dog", image: "/dog.svg" },
    { id: 9, name: "laptop", image: "/laptop.svg" },
    { id: 10, name: "laptop", image: "/laptop.svg" },
    { id: 11, name: "octopus", image: "/octopus.svg" },
    { id: 12, name: "octopus", image: "/octopus.svg" },
    { id: 13, name: "strawberry", image: "/strawberry.svg" },
    { id: 14, name: "strawberry", image: "/strawberry.svg" },
    { id: 15, name: "sunglasses", image: "/sunglasses.svg" },
    { id: 16, name: "sunglasses", image: "/sunglasses.svg" },
  ];

  const [selected, setSelected] = useState([]);
  const [randomDeck, setRandomDeck] = useState([]);
  const [coupled, setCoupled] = useState([]);

  function RandomizeArray(arr) {
    const newArray = [];
    const arrLength = arr.length;

    for (let i = 0; i < arrLength; i++) {
      const index = Math.floor(Math.random() * arr.length);
      newArray.push(arr[index]);
      newArray[newArray.length - 1].id = newArray.length - 1;
      arr.splice(index, 1);
    }

    return newArray;
  }

  const selectCard = (id) => {
    if (!selected.includes(id)) {
      if (selected.length % 2 === 0 && selected.length !== 0) {
        const arrLength = selected.length;
        const name1 = randomDeck[selected[arrLength - 1]].name;
        const name2 = randomDeck[selected[arrLength - 2]].name;
        if (name1 !== name2) setSelected([...coupled, id]);
        else {
          setCoupled(selected);
          setSelected([...selected, id]);
        }
      } else {
        setSelected([...selected, id]);
      }
    }

    if (selected.length === deck.length - 1) {
      setRandomDeck(RandomizeArray(deck));
      setSelected([]);
      setCoupled([]);
    }
  };

  useEffect(() => {
    const randomizedDeck = RandomizeArray(deck);
    setRandomDeck(randomizedDeck);
  }, []);

  const cardsToDisplay = randomDeck.map((card) => {
    return (
      <Card
        key={card.id}
        id={card.id}
        name={card.name}
        image={card.image}
        selectCard={selectCard}
        selected={selected.includes(card.id)}
      />
    );
  });

  return (
    <div className={styles.home}>
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>Memory Game 🧠</h1>
        <div className={styles.headerDivider} />
      </div>

      <div className={styles.main}>
        <div className={styles.grid}>{cardsToDisplay}</div>
      </div>
    </div>
  );
}

export default Home;
