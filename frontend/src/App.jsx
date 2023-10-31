'use strict'
import { useState, useEffect } from 'react'
import { CgPokemon } from 'react-icons/cg'
import pokedex from '../public/pokedex-300x300.png'
import './App.css'

function App() {
	const [attempts, setAttempts] = useState(() => {
		return 1
	})
	const [correctPokemon, setCorrectPokemon] = useState(() => {
		return
	})
	const [pokemonsNr, setPokemonsNr] = useState(() => {
		return []
	})
	const [pokemonsData, setPokemonsData] = useState(() => {
		return {}
	})
	const [pokemonGen, setPokemonGen] = useState(() => {
		return 251
	})

	const randomNumberGenerator = (min, max) => {
		return Math.floor(Math.random() * (max - min + 1)) + min
	}
	const capitalize = (string) => {
		if (string.length > 1) {
			return string.charAt(0).toUpperCase() + string.slice(1)
		} else {
			return string.toUpperCase()
		}
	}
	useEffect(() => {
		const genRandomPokemons = () => {
			const randomPokemonsArray = []
			while (randomPokemonsArray.length < 4) {
				const rn = randomNumberGenerator(1, pokemonGen)
				if (!randomPokemonsArray.includes(rn)) {
					randomPokemonsArray.push(rn)
				}
			}
			setPokemonsNr(randomPokemonsArray)
		}
		genRandomPokemons()
	}, [attempts, pokemonGen])

	useEffect(() => {
		const getPokemonByNr = async () => {
			let i = 0
			const randomPokemonsObject = {}
			while (i < 4) {
				const response = await fetch(
					`https://pokeapi.co/api/v2/pokemon/${pokemonsNr[i]}`
				)
				const responseJson = await response.json()
				randomPokemonsObject[i] = responseJson
				i++
			}
			setPokemonsData(randomPokemonsObject)
		}
		getPokemonByNr()
	}, [attempts, pokemonGen, pokemonsNr])

	useEffect(() => {
		setCorrectPokemon(randomNumberGenerator(0, 3))
	}, [])

	return (
		<>
			{' '}
			<main>
			<nav>
				<div className="guesser-menu-container">
					<div className="guesser-menu-start-container">
						<button className='btn'>Começar o Jogo</button>
					</div>
					<div className="guesser-menu-pokedex-container">
						<img src={pokedex} alt="pokedex" title="Consultar Pokedex"/>
					</div>
				</div>
			</nav>
			<div className='guesser-container'>
				<div className='guesser-container-bg-top'>
					<span className='pokemon-question'>?</span>
				</div>
				<div className='guesser-container-bg-bottom'>
					<span className='pokemon-text'>Pokémon</span>
				</div>
				<div className='guesser-pokemon-card'>
					<div className='guesser-pokemon-card-top'>
						<span className='guesser-pokemon-card-timer'>
							<strong>Tempo restante: </strong>
						</span>
						<div className='guesser-pokemon-card-left'>
							<div className='guesser-pokemon-card-left-score-1'>
								<CgPokemon />
							</div>
							<div className='guesser-pokemon-card-left-score-2'>
								<CgPokemon />
							</div>
							<div className='guesser-pokemon-card-left-score-3'>
								<CgPokemon />
							</div>
							<div className='guesser-pokemon-card-left-score-4'>
								<CgPokemon />
							</div>
							<div className='guesser-pokemon-card-left-score-5'>
								<CgPokemon />
							</div>
						</div>
					</div>
					<div className='guesser-pokemon-card-img'>
						{pokemonsData[correctPokemon] ? (
							<img
								src={
									pokemonsData[correctPokemon].sprites?.other[
										'official-artwork'
									].front_default
								}
								alt=''
							/>
						) : (
							<div className='guesser-pokemon-card-img-loader'>
								<CgPokemon />
							</div>
						)}
					</div>
					<div className='guesser-pokemon-card-btn'>
						{pokemonsNr.map((_, i) => (
							<button
								key={i}
								className='btn'
							>
								{pokemonsData[i]
									? capitalize(pokemonsData[i]?.name)
									: `Opção ${i}`}
							</button>
						))}
					</div>
				</div>
			</div>
			</main>
		</>
	)
}

export default App
