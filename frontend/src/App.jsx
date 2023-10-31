'use strict'
import { useState, useEffect } from 'react'
import { CgPokemon } from 'react-icons/cg'
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
		return 151
	})

	const randomNumberGenerator = (min, max) => {
		return Math.floor(Math.random() * (max - min + 1)) + min
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
								alt='Quém é esse Pokémon'
							/>
						) : (
							<div className='guesser-pokemon-card-img-loader'>
								<CgPokemon />
							</div>
						)}
						<img
							src='pokemonsData[correctPokemon]?.name}'
							alt=''
						/>
					</div>
					<div className='guesser-pokemon-card-btn'>
						<button className='btn'>{pokemonsData[0]?.name}</button>
						<button className='btn'>{pokemonsData[1]?.name}</button>
						<button className='btn'>{pokemonsData[2]?.name}</button>
						<button className='btn'>{pokemonsData[3]?.name}</button>
					</div>
				</div>
			</div>
		</>
	)
}

export default App
