'use strict'
import { useState, useEffect } from 'react'
import { HiBars4 } from 'react-icons/hi2'
import './Pokedex.css'

const Pokedex = ({
	pokemonPokedexNr,
	setPokemonPokedexNr,
	capitalize,
	switchPokemonColors,
}) => {
	const [pokemonPokedexData, setPokemonPokedexData] = useState(() => {
		return {}
	})
	const [pokemonPokedexFlavorTexts, setPokemonPokedexFlavorTexts] = useState(
		() => {
			return []
		}
	)

	const TOTALBUTTONS = 10
	const DIVSBUTTONS = []
	const fulfillButtons = (n) => {
		for (let i = 0; i < n; i++) {
			DIVSBUTTONS.push(i)
		}
	}
	fulfillButtons(TOTALBUTTONS)

	const TOTALSTATS = 5
	const DIVSSTATS = []
	const fulfillStats = (n) => {
		for (let i = 0; i < n; i++) {
			DIVSSTATS.push(i)
		}
	}
	fulfillStats(TOTALSTATS)

	const geEnFlavor = (n) => {
		// return n.replace(/\n|\u000c/g, ' ')
	}

	const addZeros = (n) => {
		if (n) {
			const nn = n.toString().padStart(4, '0')
			return `#${nn}`
		}
	}

	useEffect(() => {
		const getPokedexData = async () => {
			try {
				const responsePokemon = await fetch(
					`https://pokeapi.co/api/v2/pokemon/${pokemonPokedexNr}`
				)
				if (responsePokemon.ok) {
					const responsePokemonJson = await responsePokemon.json()

					try {
						const responsePokemonSpecies = await fetch(
							`https://pokeapi.co/api/v2/pokemon-species/${pokemonPokedexNr}`
						)
						if (responsePokemonSpecies.ok) {
							const responsePokemonSpeciesJson =
								await responsePokemonSpecies.json()
							setPokemonPokedexData((prev) => ({
								...prev,
								pokemon: responsePokemonJson,
								species: responsePokemonSpeciesJson,
							}))
						}
					} catch (error) {
						console.log('responsePokemonSpecies: ', error)
					}
				}
			} catch (error) {
				console.log('responsePokemon: ', error)
			}
		}
		getPokedexData()
	}, [pokemonPokedexNr])

	useEffect(() => {
		if (pokemonPokedexData.species) {
			let n = 0
			setPokemonPokedexFlavorTexts([])
			for (
				let i = 0;
				i < Object.keys(pokemonPokedexData.species.flavor_text_entries).length;
				i++
			) {
				if (
					pokemonPokedexData.species.flavor_text_entries[i].language.name ==
					'en'
				) {
					console.log(
						pokemonPokedexData.species.flavor_text_entries[i].flavor_text, n
					)
					setPokemonPokedexFlavorTexts((prev) =>[...prev, pokemonPokedexData.species.flavor_text_entries[i].flavor_text])
					n++
				}
			}
		}
	}, [pokemonPokedexData])

	console.log(pokemonPokedexFlavorTexts)

	return (
		<>
			<div className='pokedex-container'>
				<div className='pokedex-left-side'>
					<div className='pokedex-left-side-top'>
						<div className='pokedex-left-side-top-svg-container'>
							<svg
								height='152'
								width='381'
								className='pokedex-left-side-top-svg'
							>
								<polyline
									points='0,150 115,150 140,80 381,80'
									style={{ fill: 'none', stroke: 'black', strokeWidth: '3' }}
								/>
							</svg>
						</div>
						<div className='pokedex-left-side-top-big-blue-light-container'>
							<div className='pokedex-left-side-top-big-blue-light'>
								<div className='pokedex-left-side-top-big-blue-light-reflection'></div>
							</div>
						</div>
						<div className='pokedex-left-side-top-three-lights-container'>
							<div className='pokedex-left-side-top-three-light-red'>
								<div className='pokedex-left-side-top-three-light-red-reflection'></div>
							</div>
							<div className='pokedex-left-side-top-three-light-yellow'>
								<div className='pokedex-left-side-top-three-light-yellow-reflection'></div>
							</div>
							<div className='pokedex-left-side-top-three-light-green'>
								<div className='pokedex-left-side-top-three-light-green-reflection'></div>
							</div>
						</div>
					</div>
					<div className='pokedex-left-side-mid'>
						<div className='pokedex-left-side-mid-screen-container'>
							<div className='pokedex-left-side-mid-screen-top'>
								<div className='pokedex-left-side-mid-screen-top-button-bright-container'>
									<div className='pokedex-left-side-mid-screen-top-button-bright-plus'></div>
									<div className='pokedex-left-side-mid-screen-top-button-bright-minus'></div>
								</div>
							</div>
							<div className='pokedex-left-side-mid-screen-display-container'>
								<div className='pokedex-left-side-mid-screen-display'>
									<div
										className='pokedex-left-side-mid-screen-display-img'
										style={{
											backgroundColor: switchPokemonColors(
												pokemonPokedexData.species?.color.name
											),
										}}
									>
										{
											<img
												src={
													pokemonPokedexData.pokemon?.sprites.other[
														'official-artwork'
													].front_default
												}
												alt={
													pokemonPokedexData.pokemon?.species.name &&
													capitalize(pokemonPokedexData.pokemon?.species.name)
												}
												title={
													pokemonPokedexData.pokemon?.species.name &&
													capitalize(pokemonPokedexData.pokemon?.species.name)
												}
											></img>
										}
									</div>
									<div className='pokedex-left-side-mid-screen-display-info-container'>
										<div className='pokedex-left-side-mid-screen-display-name'>
											<div className='pokedex-left-side-mid-screen-display-name-text'>
												{pokemonPokedexData.pokemon?.species.name}
											</div>
										</div>
										<div className='pokedex-left-side-mid-screen-display-number'>
											<div className='pokedex-left-side-mid-screen-display-number-text'>
												{pokemonPokedexData.pokemon?.id
													? addZeros(pokemonPokedexData.pokemon?.id)
													: '#????'}
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className='pokedex-left-side-mid-screen-bottom'>
								<div className='pokedex-left-side-mid-screen-bottom-container'>
									<div className='pokedex-left-side-mid-screen-bottom-button'></div>
									<div className='pokedex-left-side-mid-screen-bottom-speaker'>
										<HiBars4 />
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='pokedex-left-side-bottom'>
						<div className='pokedex-left-side-bottom-confirm-button-container'>
							<div className='pokedex-left-side-bottom-confirm-button'></div>
						</div>
						<div className='pokedex-left-side-bottom-mid-buttons-container'>
							<div className='pokedex-left-side-bottom-mid-buttons-top'>
								<div className='pokedex-left-side-bottom-mid-buttons-top-leftbtn'></div>
								<div className='pokedex-left-side-bottom-mid-buttons-top-rightbtn'></div>
							</div>
							<div className='pokedex-left-side-bottom-mid-buttons-bottom'>
								<div className='pokedex-left-side-bottom-mid-buttons-bottom-screen'>
									{DIVSSTATS.map((i) => (
										<div
											key={i}
											className='pokedex-left-side-bottom-mid-buttons-bottom-screen-stats-container'
										>
											<div className='pokedex-left-side-bottom-mid-buttons-bottom-screen-stats-name'>
												{pokemonPokedexData.pokemon?.stats[i].stat.name}:
											</div>
											<div className='pokedex-left-side-bottom-mid-buttons-bottom-screen-stats-value'>
												{pokemonPokedexData.pokemon?.stats[i].base_stat}
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
						<div className='pokedex-left-side-bottom-dpad-container'>
							<div className='pokedex-left-side-bottom-dpad-mid'></div>
							<div className='pokedex-left-side-bottom-dpad-xaxis-left'></div>
							<div className='pokedex-left-side-bottom-dpad-xaxis-right'></div>
							<div className='pokedex-left-side-bottom-dpad-yaxis-top'></div>
							<div className='pokedex-left-side-bottom-dpad-yaxis-bot'></div>
							<div className='pokedex-left-side-bottom-dpad-mid-circle'></div>
						</div>
					</div>
				</div>
				<div className='pokedex-mid-section'>
					<div className='pokedex-mid-section-top'>
						<div className='pokedex-mid-section-top-junction'></div>
					</div>
					<div className='pokedex-mid-section-mid'></div>
					<div className='pokedex-mid-section-bottom'>
						<div className='pokedex-mid-section-bot-junction'></div>
					</div>
				</div>
				<div className='pokedex-right-side'>
					<div className='pokedex-right-side-top'>
						<div className='pokedex-right-side-top-svg-container'>
							<svg
								height='152'
								width='370'
								className='pokedex-right-side-top-svg'
							>
								<polyline
									points='115,152 142,81 380,80 380,152'
									style={{ fill: 'var(--red0)', stroke: 'black' }}
								/>
								<polyline
									points='0,150 115,150 140,80 378,80'
									style={{ fill: 'none', stroke: 'black', strokeWidth: '3' }}
								/>
							</svg>
						</div>
					</div>
					<div className='pokedex-right-side-mid'>
						<div className='pokedex-right-side-mid-container'>
							<div className='pokedex-right-side-mid-display'>
								{pokemonPokedexFlavorTexts.length}
							</div>
							<div className='pokedex-right-side-mid-buttons-container'>
								{DIVSBUTTONS.map((i) => (
									<div
										key={i}
										className='pokedex-right-side-mid-buttons'
										title={`Botão ${i}`}
									>
										<div className='pokedex-right-side-mid-buttons-text'>
											{i}
										</div>
									</div>
								))}
							</div>
							<div className='pokedex-right-side-mid-bottom-container'>
								<div className='pokedex-right-side-mid-bottom-button-left'></div>
								<div className='pokedex-right-side-mid-bottom-button-right'></div>
							</div>
						</div>
					</div>
					<div className='pokedex-right-side-bottom'>
						<div className='pokedex-right-side-bottom-container'>
							<div className='pokedex-right-side-bottom-top-container'>
								<div className='pokedex-right-side-bottom-top-button-left'></div>
								<div className='pokedex-right-side-bottom-top-button-right'></div>
								<div className='pokedex-right-side-bottom-top-yellow-light'>
									<div className='pokedex-right-side-bottom-top-yellow-light-reflection'></div>
								</div>
							</div>
							<div className='pokedex-right-side-bottom-bot-displays-container'>
								<div className='pokedex-right-side-bottom-bot-display-left'></div>
								<div className='pokedex-right-side-bottom-bot-display-right'></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Pokedex
