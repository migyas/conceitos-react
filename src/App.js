import React, { useState } from "react";
import { useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await api.get("repositories");
      setRepositories(data);
    })();
  }, []);

  async function handleAddRepository() {
    const { data: repository } = await api.post("repositories", {
      title: `Repositorio ${Date.now()}`,
      url: "https://",
      techs: ["React", "React Native"],
    });

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter((repository) => repository.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
