import React, { useState } from "react";
import { GiCrossedSwords, GiCircleClaws } from "react-icons/gi";
import { FaRegHandshake } from "react-icons/fa6";
import { TbTicTac } from "react-icons/tb";
import buttons from "./buttons.json";

const Main = () => {
  const [player, setPlayer] = useState("");
  const [onumbers, setOnumbers] = useState([]);
  const [xnumbers, setXnumbers] = useState([]);
  const [winnerX, setWinnerX] = useState(false);
  const [winnerO, setWinnerO] = useState(false);

  const winningCombination = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];
  
  const game = (id) => {
    if (!player) return alert("Lütfen bir oyuncu seçiniz!!!");
    if(!id) return alert("Lütfen saldıracağınız birimi doğru tıklayın!")
    if (player === "X") {
      setXnumbers((prev) => {
        checkIsGameFinished([...prev, id], player);
        // console.log("prev",prev);
        return [...prev, id];
      });
      setPlayer("O");
    } else if (player === "O") {
      setOnumbers((prev) => {
        checkIsGameFinished([...prev, id], player);
        return [...prev, id];
      });
      setPlayer("X");
    }
    console.log("X:", xnumbers);
    console.log("o:", onumbers);
    console.log("e",id);

    // console.log(new Array(9).fill(''));
  };
  

  const checkIsGameFinished = (newArray, user) => {
    winningCombination.forEach((e) => {
      console.log("win",e);
      if (newArray.sort((a,b)=>b-a).toString().includes(e.toString())) {
        user === "X"
          ? setWinnerX(true)
          : user === "O"
          ? setWinnerO(true)
          : setPlayer("");
      }
    });
  };

  const resetGame = () => {
    setPlayer("");
    setOnumbers([]);
    setXnumbers([]);
    setWinnerX(false);
    setWinnerO(false);
  };

  const randomPlayer = () => {
    const random = Math.floor(Math.random() * 1000);
    // console.log(random);
    random % 2 === 0 ? setPlayer("X") : setPlayer("O");
  };

  return (
    <>
      <h2>
        Multiplayer <TbTicTac size={"2rem"} /> Game
      </h2>
      <div className="container text-center mt-3 d-flex align-items-center justify-content-center gap-3">
        <div className="dropdown">
          <button
            className="btn btn-outline-dark dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {player === "" ? (
              "Choose Player"
            ) : player === "X" ? (
              <GiCrossedSwords size={"1.5rem"} color="#2B2A4C" />
            ) : (
              <GiCircleClaws size={"1.5rem"} color="#B31312" />
            )}
          </button>
          <ul className="dropdown-menu text-center">
            <li>
              <a
                className="dropdown-item"
                onClick={() => setPlayer("X")}
                href="#playerx"
              >
                <GiCrossedSwords size={"1.5rem"} color="#2B2A4C" />
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                onClick={() => setPlayer("O")}
                href="#playero"
              >
                <GiCircleClaws size={"1.5rem"} color="#B31312" />
              </a>
            </li>
          </ul>
        </div>
        <button
          className="btn btn-outline-dark"
          onClick={randomPlayer}
          disabled={player ? true : false}
        >
          Random Player
        </button>
      </div>
      <h3 className="text-center my-3">
        Attacking Turn :
        {player === "" ? (
          " --- "
        ) : player === "X" ? (
          <GiCrossedSwords size={"1.5rem"} color="#2B2A4C" />
        ) : (
          <GiCircleClaws size={"1.5rem"} color="#B31312" />
        )}{" "}
      </h3>
      <div className="container text-center">
        <div className="row row-cols-3 g-1">
          {buttons.map((button) => (
            <div
              key={button.id}
              className="col"
              onClick={(e) => game(e.target.dataset.id)}
            >
              <div className="digit" data-id={button.id}>
                {xnumbers.includes(button.id.toString()) ? (
                  <GiCrossedSwords size={"1.5rem"} color="#2B2A4C" />
                ) : onumbers.includes(button.id.toString()) ? (
                  <GiCircleClaws size={"1.5rem"} color="#B31312" />
                ) : (
                  ""
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="text-center mt-5">
        {winnerX ? (
          <h2>
            <GiCrossedSwords size={"1.5rem"} color="#2B2A4C" /> Kazandı...
          </h2>
        ) : winnerO ? (
          <h2>
            <GiCircleClaws size={"1.5rem"} color="#B31312" /> Kazandı...
          </h2>
        ) : (
          <h2>
            <FaRegHandshake /> Berabere...
          </h2>
        )}
        <button className="btn btn-danger mt-5" onClick={resetGame}>
          Play Again
        </button>
      </div>
    </>
  );
};

export default Main;
