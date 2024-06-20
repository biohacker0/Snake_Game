import { useState, useEffect, useRef } from "react";

function Game() {
  let [GameGrid, setGameGrid] = useState([]);
  let [Location, setLocation] = useState([
    { row: 5, col: 5 },
    { row: 5, col: 4 },
    { row: 5, col: 3 },
    { row: 5, col: 2 },
    { row: 5, col: 1 },
    { row: 5, col: 0 },
  ]);

  let [FoodPosition, setFoodPosition] = useState({ row: "", col: "" });

  let [FoodPresent, setFoodPresent] = useState(false);

  let [Direction, setDirection] = useState("right");

  let [GameOver, setGameOver] = useState(false);

  let [Health, setHealth] = useState(10);

  useEffect(
    //This React useEffect hook places food on a snake game grid. If no food is present,
    //it sets a random position not occupied by the snake and marks it as present.
    // It runs when FoodPresent or Location changes.

    function () {
      function getRandomLocation() {
        let a = Math.floor(Math.random() * 15);
        let b = Math.floor(Math.random() * 15);
        if (PresentInSnakeLocation({ row: a, col: b })) {
          return getRandomLocation();
        } else {
          return { row: a, col: b };
        }
      }
      function PresentInSnakeLocation(foodlocation) {
        for (let cell of Location) {
          if (cell.row === foodlocation.row && cell.col === foodlocation.col) {
            return true;
          }
        }
        return false;
      }

      if (!FoodPresent) {
        let tempFoodLocation = getRandomLocation();
        console.log(tempFoodLocation);
        setFoodPosition(tempFoodLocation);
        setFoodPresent(true);
        console.log("LOCATING FOOD");
      }
    },
    [FoodPresent, Location]
  );

  useEffect(
    function () {
      function InLocation(row, col) {
        for (let val of Location) {
          if (val.row == row && val.col == col) {
            return true;
          }
        }
        return false;
      }

      let matrix = [];
      for (let i = 0; i < 15; i++) {
        let row = [];
        for (let j = 0; j < 15; j++) {
          if (i == FoodPosition.row && j == FoodPosition.col) {
            //console.log(FoodPosition);
            row.push({ value: 0, color: "red" });
          } else {
            if (InLocation(i, j)) {
              row.push({ value: 0, color: "yellow" });
            } else {
              row.push({ value: 0, color: "" });
            }
          }
        }
        matrix.push(row);
      }
      setGameGrid(matrix);
    },
    [Location]
  );

  // console.log(GameGrid);
  const intervalRef = useRef(null);

  useEffect(
    function () {
      // TO check health 0 and game over
      let health = Health;
      if (health <= 0) {
        setGameOver(true);
        alert("Game Over, Refresh To Restart");
      }
    },
    [Health]
  );

  useEffect(
    function () {
      if (GameOver) {
        return;
      }

      function CheckIfFoodAbove() {
        //console.log(Location[0]);
        //console.log(FoodPosition);
        if (
          Location[0].row - 1 == FoodPosition.row &&
          Location[0].col == FoodPosition.col
        ) {
          console.log("EAT FOOD UP");
          let copyofSnakeBody = [...Location];
          copyofSnakeBody.unshift({
            row: FoodPosition.row,
            col: FoodPosition.col,
          });
          setFoodPosition({ row: "", col: "" });
          setFoodPresent(false);
          setLocation(copyofSnakeBody);
          let health = Health;
          health = health + 1;
          setHealth(health);
          return true;
        }
      }

      function CheckIfFoodDown() {
        //console.log(FoodPosition);
        if (
          Location[0].row + 1 == FoodPosition.row &&
          Location[0].col == FoodPosition.col
        ) {
          console.log("EAT FOOD DOWN");
          let copyofSnakeBody = [...Location];
          copyofSnakeBody.unshift({
            row: FoodPosition.row,
            col: FoodPosition.col,
          });
          setFoodPosition({ row: "", col: "" });
          setFoodPresent(false);
          setLocation(copyofSnakeBody);
          let health = Health;
          health = health + 1;
          setHealth(health);
          return true;
        }
      }

      function CheckIfFoodRight() {
        if (
          Location[0].row == FoodPosition.row &&
          Location[0].col + 1 == FoodPosition.col
        ) {
          console.log("EAT FOOD RIGHT");
          let copyofSnakeBody = [...Location];
          copyofSnakeBody.unshift({
            row: FoodPosition.row,
            col: FoodPosition.col,
          });
          setFoodPosition({ row: "", col: "" });
          setFoodPresent(false);
          setLocation(copyofSnakeBody);
          let health = Health;
          health = health + 1;
          setHealth(health);
          return true;
        }
      }

      function CheckIfFoodLeft() {
        if (
          Location[0].row == FoodPosition.row &&
          Location[0].col - 1 == FoodPosition.col
        ) {
          console.log("EAT FOOD RIGHT");
          let copyofSnakeBody = [...Location];
          copyofSnakeBody.unshift({
            row: FoodPosition.row,
            col: FoodPosition.col,
          });
          setFoodPosition({ row: "", col: "" });
          setFoodPresent(false);
          setLocation(copyofSnakeBody);
          let health = Health;
          health = health + 1;
          setHealth(health);
          return true;
        }
      }

      function CheckIfBodyAbove() {
        for (let i = 1; i < Location.length; i++) {
          if (
            Location[0].row - 1 == Location[i].row &&
            Location[0].col == Location[i].col
          ) {
            console.log("HEALTH-- UP");
            let health = Health;
            health = health - 1;
            setHealth(health);
          }
        }
      }

      function CheckIfBodyDown() {
        for (let i = 1; i < Location.length; i++) {
          if (
            Location[0].row + 1 == Location[i].row &&
            Location[0].col == Location[i].col
          ) {
            console.log("HEALTH-- DOWN");
            let health = Health;
            health = health - 1;
            setHealth(health);
          }
        }
      }

      function CheckIfBodyLeft() {
        for (let i = 1; i < Location.length; i++) {
          if (
            Location[0].row == Location[i].row &&
            Location[0].col - 1 == Location[i].col
          ) {
            console.log("HEALTH-- LEFT");
            let health = Health;
            health = health - 1;
            setHealth(health);
          }
        }
      }

      function CheckIfBodyRight() {
        for (let i = 1; i < Location.length; i++) {
          if (
            Location[0].row == Location[i].row &&
            Location[0].col + 1 == Location[i].col
          ) {
            console.log("HEALTH-- RIGHT");
            let health = Health;
            health = health - 1;
            setHealth(health);
          }
        }
      }

      document.addEventListener("keypress", handleKeyPress);

      function up() {
        if (Location[0].row > 0) {
          //console.log('UP');
          if (CheckIfFoodAbove()) {
            return;
          }
          if (CheckIfBodyAbove()) {
            return;
          }
          let copyofLocation = [...Location];
          let secondcopyofLocation = structuredClone(copyofLocation);
          copyofLocation[0].row = copyofLocation[0].row - 1;
          let newLocation = [];
          newLocation = newLocation.concat(
            copyofLocation[0],
            secondcopyofLocation.slice(0, secondcopyofLocation.length - 1)
          );
          //console.log(newLocation);
          setLocation(newLocation);
        }
      }

      function down() {
        if (Location[0].row < 14) {
          //console.log('DOWN');
          if (CheckIfFoodDown()) {
            return;
          }
          if (CheckIfBodyDown()) {
            return;
          }
          let copyofLocation = [...Location];
          let secondcopyofLocation = structuredClone(copyofLocation);
          copyofLocation[0].row = copyofLocation[0].row + 1;

          let newLocation = [];
          newLocation = newLocation.concat(
            copyofLocation[0],
            secondcopyofLocation.slice(0, secondcopyofLocation.length - 1)
          );
          //console.log(newLocation);
          setLocation(newLocation);
        }
      }

      function right() {
        if (Location[0].col < 14) {
          //console.log('RIGHT');
          if (CheckIfFoodRight()) {
            return;
          }
          if (CheckIfBodyRight()) {
            return;
          }
          let copyofLocation = [...Location];
          let secondcopyofLocation = structuredClone(copyofLocation);
          copyofLocation[0].col = copyofLocation[0].col + 1;
          let newLocation = [];
          newLocation = newLocation.concat(
            copyofLocation[0],
            secondcopyofLocation.slice(0, secondcopyofLocation.length - 1)
          );
          //console.log(newLocation);
          setLocation(newLocation);
        }
      }

      function left() {
        if (Location[0].col > 0) {
          //console.log('LEFT');
          if (CheckIfFoodLeft()) {
            return;
          }
          if (CheckIfBodyLeft()) {
            return;
          }
          let copyofLocation = [...Location];
          let secondcopyofLocation = structuredClone(copyofLocation);
          copyofLocation[0].col = copyofLocation[0].col - 1;
          let newLocation = [];
          newLocation = newLocation.concat(
            copyofLocation[0],
            secondcopyofLocation.slice(0, secondcopyofLocation.length - 1)
          );
          //console.log(newLocation);
          setLocation(newLocation);
        }
      }

      function handleKeyPress(e) {
        let ketpressed = e.key;
        if (ketpressed == "w") {
          // up();
          setDirection("up");
        }
        if (ketpressed == "s") {
          // down();
          setDirection("down");
        }
        if (ketpressed == "a") {
          // left();
          setDirection("left");
        }
        if (ketpressed == "d") {
          // right();
          setDirection("right");
        }
      }

      intervalRef.current = setInterval(function () {
        let direction = Direction;
        if (direction == "up") up();
        if (direction == "down") down();
        if (direction == "right") right();
        if (direction == "left") left();
      }, 500);

      return function cleanup() {
        document.removeEventListener("keypress", handleKeyPress);
        clearInterval(intervalRef.current);
      };
    },
    [Location]
  );

  // console.log(Health);

  return (
    <div>
      <h3>{Health}</h3>
      {GameGrid.map(function (row, rowIndex) {
        return (
          <div key={rowIndex} style={{ display: "flex" }}>
            {row.map(function (cell, cellIndex) {
              return (
                <button
                  key={cellIndex}
                  style={{
                    width: "30px",
                    height: "30px",
                    margin: "2px",
                    background: cell.color,
                  }}
                >
                  {cell.value}
                </button>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default Game;
