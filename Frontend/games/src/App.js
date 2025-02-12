import { useEffect, useState } from "react";

function App() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/api/games")
      .then((res) => res.json())
      .then((data) => {
        setGames(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Free to Play Games</h1>
      {loading ? <p>Loading...</p> : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "10px" }}>
          {games.map((game) => (
            <div key={game.id} style={{ border: "1px solid #ddd", padding: "10px", borderRadius: "10px" }}>
              <img src={game.thumbnail} alt={game.title} style={{ width: "100%", borderRadius: "5px" }} />
              <h3>{game.title}</h3>
              <p>{game.genre}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
