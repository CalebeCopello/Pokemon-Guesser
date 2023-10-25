'use strict'
import { useState, useEffect } from 'react'
import './App.css'

function App() {
	const [pokemonNr, setPokemonNr] = useState(() => {
		return 1
	})
	const [pokemonData, setPokemonData] = useState(() => {
		return pokemonNr
	})

	function incPokemonNr() {
		setPokemonNr((prevPokemonNr) => prevPokemonNr + 1)
	}
	function decPokemonNr() {
		setPokemonNr((prevPokemonNr) => prevPokemonNr - 1)
	}

	useEffect(() => {
		console.log(`'get pokemon' ${pokemonNr}`)
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
		<> <div className="teste-container">
			<div className='pokemon-buttons-container'>
				{pokemonNr <= 1 ? (
					<button disabled>-</button>
				) : (
					<button onClick={decPokemonNr}>-</button>
					/* <button onClick={() => setPokemonNr((n) => n -1)}>-</button> */
				)}
				<span>{pokemonNr}</span>
				{pokemonNr >= 151 ? (
					<button disabled>+</button>
				) : (
					<button onClick={incPokemonNr}>+</button>
				)}
			</div>
			<div className="pokemon-data-container">
				<h1>{pokemonData?.name}</h1>
				<img src={pokemonData?.sprites?.front_default} />
				<img src={pokemonData?.sprites?.back_default} />
				<img src={pokemonData?.sprites?.other['official-artwork'].front_default} />
			</div>
		</div>
		</>
	)
}

export default App