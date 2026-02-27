


import { useEffect, useState } from 'react';

import {
  AppBar,
   Toolbar,
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Paper,
} from '@mui/material';

type Pokemon = {
  id: number;
  name: string;
  pokedexNumber: number;
};

type Profile = {
  id: number;
  name: string;
};

const API = 'http://localhost:3000/api';

export default function App() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<number | ''>('');
  const [selectedPokemon, setSelectedPokemon] = useState<number[]>([]);
  const [newProfileName, setNewProfileName] = useState('');

  useEffect(() => {
    fetch(`${API}/pokemon`)
      .then(res => res.json())
      .then(setPokemon);

    fetch(`${API}/profiles`)
      .then(res => res.json())
      .then(setProfiles);
  }, []);

  const createProfile = async () => {
    if (!newProfileName) return;

    const res = await fetch(`${API}/profiles`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newProfileName }),
    });

    const profile = await res.json();
    setProfiles([...profiles, profile]);
    setNewProfileName('');
  };

  const togglePokemon = (id: number) => {
    if (selectedPokemon.includes(id)) {
      setSelectedPokemon(selectedPokemon.filter(p => p !== id));
    } else {
      if (selectedPokemon.length >= 6) return;
      setSelectedPokemon([...selectedPokemon, id]);
    }
  };

  const submitTeam = async () => {
    if (!selectedProfile) return;

    await fetch(`${API}/profiles/${selectedProfile}/team`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pokemonIds: selectedPokemon }),
    });

    alert('Team submitted!');
    setSelectedPokemon([]);
  };

  return (
    <>
  <AppBar position="static" sx={{ mb: 4 }}>
    <Toolbar sx={{ display: 'flex', justifyContent: 'center' }}>
      <img
        src="/pokemon-logo.png"
        alt="Pokemon Logo"
        style={{ height: 60 }}
      />
    </Toolbar>
  </AppBar>

<Container maxWidth="lg" sx={{ mt: 4 }}>

      <Typography variant="h4" gutterBottom>
        Pokémon Team Builder
      </Typography>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6">Create Profile</Typography>
        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <TextField
            label="Profile Name"
            value={newProfileName}
            onChange={e => setNewProfileName(e.target.value)}
            fullWidth
          />
          <Button variant="contained" onClick={createProfile}>
            Create
          </Button>
        </Box>
      </Paper>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6">Select Profile</Typography>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel>Profile</InputLabel>
          <Select
            value={selectedProfile}
            label="Profile"
            onChange={e => setSelectedProfile(e.target.value as number)}
          >
            {profiles.map(p => (
              <MenuItem key={p.id} value={p.id}>
                {p.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Paper>

      <Typography variant="h6" gutterBottom>
        Select up to 6 Pokémon
      </Typography>

      <Grid container spacing={2}>
        {pokemon.map(p => (
          <Grid item xs={12} sm={6} md={4} key={p.id}>
            <Card variant="outlined">
              <CardContent>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedPokemon.includes(p.id)}
                      disabled={
                        !selectedPokemon.includes(p.id) &&
                        selectedPokemon.length >= 6
                      }
                      onChange={() => togglePokemon(p.id)}
                    />
                  }
                  label={`#${p.pokedexNumber} ${p.name}`}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Button
          variant="contained"
          size="large"
          disabled={!selectedProfile}
          onClick={submitTeam}
        >
          Submit Team
        </Button>
      </Box>
    </Container>

</>
    
  );
}


// import { useEffect, useState } from 'react';

// type Pokemon = {
//   id: number;
//   name: string;
//   pokedexNumber: number;
// };

// type Profile = {
//   id: number;
//   name: string;
// };

// const API = 'http://localhost:3000/api';

// export default function App()  {
//   const [pokemon, setPokemon] = useState<Pokemon[]>([]);
//   const [profiles, setProfiles] = useState<Profile[]>([]);
//   const [selectedProfile, setSelectedProfile] = useState<number | null>(null);
//   const [selectedPokemon, setSelectedPokemon] = useState<number[]>([]);
//   const [newProfileName, setNewProfileName] = useState('');

//   useEffect(() => {
//     fetch(`${API}/pokemon`)
//       .then(res => res.json())
//       .then(setPokemon);

//     fetch(`${API}/profiles`)
//       .then(res => res.json())
//       .then(setProfiles);
//   }, []);

//   const createProfile = async () => {
//     if (!newProfileName) return;

//     const res = await fetch(`${API}/profiles`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ name: newProfileName }),
//     });

//     const profile = await res.json();
//     setProfiles([...profiles, profile]);
//     setNewProfileName('');
//   };

//   const togglePokemon = (id: number) => {
//     if (selectedPokemon.includes(id)) {
//       setSelectedPokemon(selectedPokemon.filter(p => p !== id));
//     } else {
//       if (selectedPokemon.length >= 6) return;
//       setSelectedPokemon([...selectedPokemon, id]);
//     }
//   };

//   const submitTeam = async () => {
//     if (!selectedProfile) return;

//     await fetch(`${API}/profiles/${selectedProfile}/team`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ pokemonIds: selectedPokemon }),
//     });

//     alert('Team submitted!');
//     setSelectedPokemon([]);
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <h1>Pokémon Team Builder</h1>

//       <h2>Create Profile</h2>
//       <input
//         value={newProfileName}
//         onChange={e => setNewProfileName(e.target.value)}
//         placeholder="Profile name"
//       />
//       <button onClick={createProfile}>Create</button>

//       <h2>Select Profile</h2>
//       <select
//         value={selectedProfile ?? ''}
//         onChange={e => setSelectedProfile(Number(e.target.value))}
//       >
//         <option value="">-- Select Profile --</option>
//         {profiles.map(p => (
//           <option key={p.id} value={p.id}>
//             {p.name}
//           </option>
//         ))}
//       </select>

//       <h2>Select up to 6 Pokémon</h2>
//       <div style={{ maxHeight: 400, overflow: 'auto', border: '1px solid #ccc', padding: 10 }}>
//         {pokemon.map(p => (
//           <div key={p.id}>
//             <label>
//               <input
//                 type="checkbox"
//                 checked={selectedPokemon.includes(p.id)}
//                 disabled={
//                   !selectedPokemon.includes(p.id) &&
//                   selectedPokemon.length >= 6
//                 }
//                 onChange={() => togglePokemon(p.id)}
//               />
//               #{p.pokedexNumber} {p.name}
//             </label>
//           </div>
//         ))}
//       </div>

//       <br />
//       <button disabled={!selectedProfile} onClick={submitTeam}>
//         Submit Team
//       </button>
//     </div>
//   );
// }

// import styled from '@emotion/styled';

// import NxWelcome from './nx-welcome';

// export function App() {
//   return <NxWelcome title="pokemon-ui" />
// }

// export default App;
