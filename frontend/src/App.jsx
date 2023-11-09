'use strict'
import { useState, useEffect } from 'react'
import Guesser from './components/Guesser/Guesser'
import Pokedex from './components/Pokedex/Pokedex'
import MenuPokedex from './components/MenuPokedex/MenuPokedex.jsx'
import MenuGeneration from './components/MenuGeneration/MenuGeneration.jsx'
import './App.css'

function App() {
	//TODO: only set the timer when the data if fetched
	/* React States */

	/** Game manipulation State s**/
	const [attempts, setAttempts] = useState(() => {
		return 0
	})
	const [score, setScore] = useState(() => {
		return []
	})
	const [counter, setCounter] = useState(() => {
		return 0
	})

	/** Pokemon Data States **/
	/*** Getting the data of the Pokemons ***/
	const [pokemonsNr, setPokemonsNr] = useState(() => {
		return []
	})
	const [correctPokemonNr, setCorrectPokemonNr] = useState(() => {
		return
	})
	const [pokemonsData, setPokemonsData] = useState(() => {
		return {}
	})
	/*** Manipulating the data of the answers ***/
	const [pokemonAnswers, setPokemonAnswers] = useState(() => {
		return {}
	})
	const [showPokemonAnswers, setShowPokemonAnswers] = useState(() => {
		return [false]
	})
	const [pokemonSpecies, setPokemonSpecies] = useState(() => {
		return {}
	})
	/*** Pokemons' generation data ***/
	const [pokemonGen, setPokemonGen] = useState(() => {
		const GEN = localStorage.getItem('pokemonGen')
		if (GEN !== null) {
		return parseInt(GEN,10)
		}
		else {
			localStorage.setItem('pokemonGen', 151)
			localStorage.setItem('genSet', 0)
			return 151
		}
	})

	/*** Showing Components ***/
	const [showMenuGen, setShowMenuGen] = useState(() => {
		return false
	})

	/* CONSTANTS */
	const TIMERTOTAL = 1
	const TOTALATTEMPTS = 6
	const DIVSATTEMPTS = []
	const fulfilDivsAttempts = (n) => {
		for (let i = 0; i < n; i++) {
			DIVSATTEMPTS.push(i)
		}
	}
	fulfilDivsAttempts(TOTALATTEMPTS)

	/* Functions */

	const randomNumberGenerator = (min, max) => {
		return Math.floor(Math.random() * (max - min + 1)) + min
	}
	const capitalize = (string) => {
		if (string.length > 1) {
			string = string.replace(/-/g, ' ')
			string = string.replace(/\bf\b/g, 'Fêmea')
			string = string.replace(/\bm\b/g, 'Macho')
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
		if (i == pokemonsData[correctPokemonNr].id) {
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

	const replaceUrl = (url) => {
		if (url) {
		const modifiedUrl = url.replace(
			/(https:\/\/raw\.githubusercontent\.com\/PokeAPI\/sprites\/master\/)(https:\/\/raw\.githubusercontent\.com\/PokeAPI\/sprites\/master\/)/,
			'$1'
		)
		return modifiedUrl
		} else {
			return url
		}
	}

	/* React Effects */

	/** Effect to set the attempt timer **/
	useEffect(() => {
		if (attempts > 0 && attempts < TOTALATTEMPTS + 1) {
			const timer =
				counter > 0 && setInterval(() => setCounter(counter - 1), 1000)
			return () => clearInterval(timer)
		}
	}, [counter, attempts])

	/*** Effect to set a wrong answer if timer is == 0 ***/
	useEffect(() => {
		if (attempts > 0 && attempts < TOTALATTEMPTS + 1 && counter === 0) {
			tryAttempt(0)
		}
	}, [counter])

	/** Effect to get an array with pokemons to set pokemons options **/
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

	/** Effect to get an object with all pokemons answers **/
	useEffect(() => {
		if (pokemonsData[correctPokemonNr]) {
			setPokemonAnswers((prevPokemonAnswers) => ({
				...prevPokemonAnswers,
				[attempts - 1]: pokemonsData[correctPokemonNr],
			}))
			const getPokemonsColorData = async () => {
				let randomPokemonsObjectColor = {}
				try {
					const response = await fetch(
						pokemonsData[correctPokemonNr]?.species.url
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

	/** Main Effect triggers on each attempt **/
	useEffect(() => {
		//set the correct answer
		let option = randomNumberGenerator(0, 3)
		while (option === correctPokemonNr) {
			option = randomNumberGenerator(0, 3)
		}
		setCorrectPokemonNr(option)
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
							//BUG: checking the issue with double url from API
							// console.log(
							// 	responseJson.sprites?.other['official-artwork'].front_default
							// )
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
			<div className='app-container'>
				<nav>
					<MenuPokedex
						startGame={startGame}
						attempts={attempts}
						DIVSATTEMPTS={DIVSATTEMPTS}
						showPokemonAnswers={showPokemonAnswers}
						switchPokemonColors={switchPokemonColors}
						pokemonSpecies={pokemonSpecies}
						score={score}
						pokemonAnswers={pokemonAnswers}
						replaceUrl={replaceUrl}
						capitalize={capitalize}
					/>
				</nav>
				<main>
					<section>
						<Guesser
							counter={counter}
							DIVSATTEMPTS={DIVSATTEMPTS}
							score={score}
							pokemonsData={pokemonsData}
							correctPokemonNr={correctPokemonNr}
							pokemonsNr={pokemonsNr}
							attempts={attempts}
							tryAttempt={tryAttempt}
							capitalize={capitalize}
							replaceUrl={replaceUrl}
						/>
					</section>
				</main>
				<aside>
					{/* {showMenuGen ? (
					<div>
						<button onClick={() => setShowMenuGen(false)}>Hide</button>
						<MenuGeneration pokemonsGenExData={pokemonsGenExData} />
					</div>
				) : (
					<button onClick={() => setShowMenuGen(true)}>Show</button>
				)} */}
					<MenuGeneration
						replaceUrl={replaceUrl}
						setPokemonGen={setPokemonGen}
					/>
				</aside>
			</div>
		</>
	)
}

export default App
