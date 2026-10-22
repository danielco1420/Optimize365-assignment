import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;
const POKEAPI_COUNT_URL = 'https://pokeapi.co/api/v2/pokemon-species?limit=1';

app.use(cors());

type PokemonSpeciesList = {
  count: number;
};

type Pokemon = {
  name: string;
  sprites: {
    front_default: string | null;
    other?: {
      'official-artwork'?: {
        front_default: string | null;
      };
    };
  };
};

app.get('/api/fetch-data', async (_req, res) => {
  try {
    const countResponse = await fetch(POKEAPI_COUNT_URL);
    const { count } = (await countResponse.json()) as PokemonSpeciesList;
    const randomId = Math.floor(Math.random() * count) + 1;

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
    if (!response.ok) {
      throw new Error('Pokemon not found');
    }

    const pokemon = (await response.json()) as Pokemon;
    const image =
      pokemon.sprites.other?.['official-artwork']?.front_default ||
      pokemon.sprites.front_default;

    if (!image) {
      throw new Error('Pokemon image missing');
    }

    res.json({
      success: true,
      name: pokemon.name,
      image,
    });
  } catch {
    res.status(500).json({ success: false, error: 'Failed to fetch data from the API' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
