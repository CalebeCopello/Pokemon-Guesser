'use strict'
import { useState, useEffect } from 'react'
import { CgPokemon} from "react-icons/cg";
import './App.css'

function App() {
	const [pokemonNr, setPokemonNr] = useState(() => {
		return 
	})
	const [pokemonData, setPokemonData] = useState(() => {
		return
	})

	const randomNumberGenerator = (min, max) => {
		return Math.floor(Math.random() * (max - min + 1)) + min
	}
	const randomPokemon = () => {
		setPokemonNr(randomNumberGenerator(1,151))
	}

	useEffect(() => {
		const getPokemonByNr = async () => {
			try {
				const response = await fetch(
					`https://pokeapi.co/api/v2/pokemon/${pokemonNr}`
				)
				const responseJson = await response.json()
				setPokemonData(responseJson)
			} catch (error) {
				console.log(`Erro: ${error}`)
			}
		}
		getPokemonByNr()
	}, [pokemonNr])
	
	return (
		<> 
		{/* <div className="teste-container">
			<div className='pokemon-buttons-container'>
				{pokemonNr <= 1 ? (
					<button disabled>-</button>
				) : (
					<button onClick={decPokemonNr}>-</button>
				)}
				<span>{pokemonNr}</span>
				{pokemonNr >= 151 ? (
					<button disabled>+</button>
				) : (
					<button onClick={incPokemonNr}>+</button>
				)}
			</div>
				<button onClick={randomPokemon}>
					Random
				</button>
			<div className="pokemon-data-container">
				<h1>{pokemonData?.name}</h1>
				<img src={pokemonData?.sprites?.front_default} />
				<img src={pokemonData?.sprites?.back_default} />
				<img src={pokemonData?.sprites?.other['official-artwork'].front_default} />
			</div>
		</div> */}
		<div className="guesser-container">
			<div className="guesser-container-bg-top">
				<span className="pokemon-question">?</span>
			</div>
			<div className="guesser-container-bg-bottom">
			<span className="pokemon-text">Pokémon</span>
			</div>
			<div className="guesser-pokemon-card">
				<div className="guesser-pokemon-card-top">
					<span className="guesser-pokemon-card-timer"><strong>Tempo restante: </strong></span>
					<div className="guesser-pokemon-card-left">
						<div className="guesser-pokemon-card-left-score-1"><CgPokemon /></div>
						<div className="guesser-pokemon-card-left-score-2"><CgPokemon /></div>
						<div className="guesser-pokemon-card-left-score-3"><CgPokemon /></div>
						<div className="guesser-pokemon-card-left-score-4"><CgPokemon /></div>
						<div className="guesser-pokemon-card-left-score-5"><CgPokemon /></div>
					</div>
				</div>
				<div className="guesser-pokemon-card-img">
				{pokemonData ? (<img src={pokemonData?.sprites?.other['official-artwork'].front_default} />) : (<CgPokemon />)}
				</div>
				<div className="guesser-pokemon-card-btn">
					<button className='btn'>Pokemon 001</button>
					<button className='btn'>Pokemon 001</button>
					<button className='btn'>Pokemon 001</button>
					<button className='btn'>Pokemon 001</button>
				</div>
			</div>
		</div>
		</>
	)
}

export default App
