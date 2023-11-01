'use strict'
import { useState, useEffect } from 'react'
import { CgPokemon } from 'react-icons/cg'
import pokedex from '/pokedex-300x300.png'
import './App.css'

function App() {
	const [attempts, setAttempts] = useState(() => {
		return 0
	})
	const [score, setScore] = useState(() => {
		return 0
	})
	const [counter, setCounter] = useState(() => {
		return 10
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
	const capitalize = (string) => {
		if (string.length > 1) {
			return string.charAt(0).toUpperCase() + string.slice(1)
		} else {
			return string.toUpperCase()
		}
	}
	const startGame = () => {
		setAttempts(() => attempts + 1)
		setScore(0)
	}
	const tryAttempt = (i) => {
		if (i == pokemonsData[correctPokemon].id) {
			console.log('correto')
			setScore((prevScore) => prevScore + 1)
		} else {
			console.log('incorreto')
		}
		setAttempts((prevAttemps) => prevAttemps + 1)
		setCounter(10)
	}

	useEffect(() => {
		const genRandomPokemons = () => {
			setPokemonsNr([])
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
		if (attempts > 0 && attempts < 6) {
			const getPokemonByNr = async () => {
				let i = 0
				const randomPokemonsObject = {}
				setPokemonsData({})
				while (i < 4) {
					try {
						const response = await fetch(
							`https://pokeapi.co/api/v2/pokemon/${pokemonsNr[i]}`
						)
						if (response.ok) {
							const responseJson = await response.json()
							randomPokemonsObject[i] = responseJson
							i++
						}
					} catch (error) {
						console.log(error)
					}
				}
				setPokemonsData(randomPokemonsObject)
			}
			getPokemonByNr()
			console.log('effect', attempts)
		} else {
			setPokemonsData({})
		}
	}, [attempts])

	useEffect(() => {
		let option = randomNumberGenerator(0, 3)
		while(option === correctPokemon) {
			option = randomNumberGenerator(0, 3)
		}
		setCorrectPokemon(option)
		if (attempts > 5) {
			setAttempts(0)
		}
	}, [attempts])

	useEffect(() => {
		if (attempts > 0 && attempts < 6) {
			const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000)
			return () => clearInterval(timer)
		}
	}, [counter, attempts])

	useEffect(() => {
		if (attempts > 0 && attempts < 6 && counter === 0) {
			tryAttempt(0)
		}
	}, [counter])

	return (
		<>
			{' '}
			<main>
				<nav>
					<div className='guesser-menu-container'>
						<div className='guesser-menu-start-container'>
							<button
								className='btn'
								disabled={attempts > 0}
								onClick={startGame}
							>
								Começar o Jogo
							</button>
						</div>
						<div className='guesser-menu-pokedex-container'>
							<button>
								<img
									src={pokedex}
									alt='pokedex'
									title='Consultar Pokedex'
								/>
							</button>
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
								<strong>Tempo restante: {counter}</strong>
							</span>
							<div className='guesser-pokemon-card-left'>
								<div
									className='guesser-pokemon-card-left-score'
									style={{ color: score >= 1 ? 'var(--blue0)' : 'var(--red0)' }}
								>
									<CgPokemon />
								</div>
								<div
									className='guesser-pokemon-card-left-score'
									style={{ color: score >= 2 ? 'var(--blue0)' : 'var(--red0)' }}
								>
									<CgPokemon />
								</div>
								<div
									className='guesser-pokemon-card-left-score'
									style={{ color: score >= 3 ? 'var(--blue0)' : 'var(--red0)' }}
								>
									<CgPokemon />
								</div>
								<div
									className='guesser-pokemon-card-left-score'
									style={{ color: score >= 4 ? 'var(--blue0)' : 'var(--red0)' }}
								>
									<CgPokemon />
								</div>
								<div
									className='guesser-pokemon-card-left-score'
									style={{ color: score >= 5 ? 'var(--blue0)' : 'var(--red0)' }}
								>
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
									onClick={() => tryAttempt(pokemonsData[i].id)}
									disabled={attempts === 0}
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
