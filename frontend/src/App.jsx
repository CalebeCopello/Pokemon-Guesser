'use strict'
import { useState, useEffect } from 'react'
import { CgPokemon } from 'react-icons/cg'
import pokedex from '/pokedex-300x300.png'
import './App.css'

function App() {
	//React Variables
	const [attempts, setAttempts] = useState(() => {
		return 0
	})
	const [score, setScore] = useState(() => {
		return []
	})
	const [counter, setCounter] = useState(() => {
		return 0
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
	const [pokemonAnswers, setPokemonAnswers] = useState(() => {
		return {}
	})
	const [showPokemonAnswers, setShowPokemonAnswers] = useState(() => {
		return [false]
	})
	const [pokemonSpecies, setPokemonSpecies] = useState(() => {
		return []
	})

	//Constants
	const TIMERTOTAL = 7
	const TOTALATTEMPTS = 6
	const DIVS = []
	const fulfilDivs = (n) => {
		for (let i = 0; i < n; i++) {
			DIVS.push(i)
		}
	}
	fulfilDivs(TOTALATTEMPTS)

	//Utils functions
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
		setScore([])
		setPokemonAnswers({})
		setShowPokemonAnswers([false])
	}
	const tryAttempt = (i) => {
		if (i == pokemonsData[correctPokemon].id) {
			setScore((prevScore) => {
				const updated = [...prevScore]
				updated.push(true)
				return updated
			})
		} else {
			setScore((prevScore) => {
				const updated = [...prevScore]
				updated.push(false)
				return updated
			})
		}
		setAttempts((prevAttemps) => prevAttemps + 1)
		setCounter(TIMERTOTAL)
		setShowPokemonAnswers((prevShowPokemonAnswers) => {
			const updated = [...prevShowPokemonAnswers]
			updated.unshift(true)
			return updated
		})
		console.log(score)
		console.log(score.length)
	}
	const switchPokemonColors = (color) => {
		switch (color) {
			case 'red':
				return 'var(--pokeRed)'
			case 'blue':
				return 'var(--pokeBlue)'
			case 'yellow':
				return 'var(--pokeYellow)'
			case 'green':
				return 'var(--pokeGreen)'
			case 'black':
				return 'var(--pokeBlack)'
			case 'brown':
				return 'var(--pokeBrown)'
			case 'purple':
				return 'var(--pokePurple)'
			case 'gray':
				return 'var(--pokeGray)'
			case 'white':
				return 'var(--pokeWhite)'
			case 'pink':
				return 'var(--pokePink)'
			default:
				return 'var(--pokeBlack)'
		}
	}

	//Effect to get an array with pokemons to set pokemons options
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

	//Effect to get an object with all pokemons answers
	useEffect(() => {
		if (pokemonsData[correctPokemon]) {
			setPokemonAnswers((prevPokemonAnswers) => ({
				...prevPokemonAnswers,
				[attempts - 1]: pokemonsData[correctPokemon],
			}))
			console.log(pokemonsData[correctPokemon]?.species.url)
			const getPokemonsColorData = async () => {
				let randomPokemonsObjectColor = {}
				try {
					const response = await fetch(
						pokemonsData[correctPokemon]?.species.url
					)
					if (response.ok) {
						const responseJson = await response.json()
						randomPokemonsObjectColor = responseJson
					}
				} catch (error) {
					console.log(error)
				}
				setPokemonSpecies((prevPokemonSpecies) => ({
					...prevPokemonSpecies,
					[attempts - 1]: randomPokemonsObjectColor,
				}))
			}
			getPokemonsColorData()
		}
	}, [pokemonsData])

	//Effect to set the attempt timer
	useEffect(() => {
		if (attempts > 0 && attempts < TOTALATTEMPTS + 1) {
			const timer =
				counter > 0 && setInterval(() => setCounter(counter - 1), 1000)
			return () => clearInterval(timer)
		}
	}, [counter, attempts])

	//Effect to set a wrong answer if timer is == 0
	useEffect(() => {
		if (attempts > 0 && attempts < TOTALATTEMPTS + 1 && counter === 0) {
			tryAttempt(0)
		}
	}, [counter])

	// Main Effect triggers on wich attempt

	useEffect(() => {
		//set the correct answer
		let option = randomNumberGenerator(0, 3)
		while (option === correctPokemon) {
			option = randomNumberGenerator(0, 3)
		}
		setCorrectPokemon(option)
		//fetch data to the four options and fills the pokemonData object and resets the object
		if (attempts > 0 && attempts < TOTALATTEMPTS + 1) {
			const getPokemonByNr = async () => {
				let i = 0
				setCounter(TIMERTOTAL)
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
		} else {
			setPokemonsData({})
		}
		//if clause that resets the game
		if (attempts > TOTALATTEMPTS) {
			setAttempts(0)
		}
	}, [attempts])

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
						<div className='guesser-menu-pokemons-answer-container'>
							{DIVS.map((i) => (
								<div
									key={i}
									className='guesser-menu-pokemons-answer'
									style={{
										cursor: showPokemonAnswers[i] ? 'pointer' : 'wait',
										backgroundColor: showPokemonAnswers[i]
											? switchPokemonColors(pokemonSpecies[i]?.color.name)
											: '',
									}}
								>
									<div
										className='guesser-menu-pokemons-answer-score'
										style={{
											
											color: score[i] ? 'var(--blue0)' : 'var(--red0)',
											visibility: showPokemonAnswers[i] ? 'visible' : 'hidden'
										}}
									>
										<CgPokemon />
									</div>
									<div className='guesser-menu-pokemons-answer-front'>
										{showPokemonAnswers[i] ? (
											<img
												src={pokemonAnswers[i].sprites.front_default}
												alt={pokemonAnswers[i].name}
											/>
										) : (
											'?'
										)}
									</div>
									<div className='guesser-menu-pokemons-answer-back'>
										{showPokemonAnswers[i] ? (
											<img
												src={pokemonAnswers[i].sprites.back_default}
												alt={pokemonAnswers[i].name}
											/>
										) : (
											'?'
										)}
									</div>
								</div>
							))}
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
								{DIVS.map((i) => (
									<div
										key={i}
										className='guesser-pokemon-card-left-score'
										style={{
											color: score[i] ? 'var(--blue0)' : 'var(--red0)',
										}}
									>
										<CgPokemon />
									</div>
								))}
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
