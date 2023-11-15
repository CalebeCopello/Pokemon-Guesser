'use strict'
import { useState, useEffect } from 'react'
import { HiBars4 } from 'react-icons/hi2'
import { MdGTranslate } from 'react-icons/md'
import { AiOutlineEnter } from 'react-icons/ai'
import { IoBackspaceOutline } from 'react-icons/io5'
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
	const [pokemonPokedexFlavorTextNr, setPokemonPokedexFlavorTextNr] = useState(
		() => {
			return 0
		}
	)
	const [
		pokemonPokedexFlavorTextsTranslation,
		setPokemonPokedexFlavorTextsTranslation,
	] = useState(() => {
		return true
	})
	const [
		pokemonPokedexFlavorTextsTranslated,
		setPokemonPokedexFlavorTextsTranslated,
	] = useState(() => {
		return []
	})
	const [pokemonDataExtra, setPokemonDataExtra] = useState(() => {
		return {}
	})
	const [showPokemonDisplayImg, setShowPokemonDisplayImg] = useState(() => {
		return true
	})
	const [pokemonSearch, setPokemonSearch] = useState(() => {
		return false
	})
	const [pokemonSearchNr, setPokemonSearchNr] = useState(() => {
		return ''
	})

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

	const formatFlavor = (n) => {
		return n.replace(/\n|\u000c/g, ' ')
	}

	const addZeros = (n) => {
		if (n) {
			const nn = n.toString().padStart(4, '0')
			return `#${nn}`
		}
	}

	const handleFlavor = (n) => {
		if (pokemonPokedexFlavorTextNr === 0 && n === -1) {
			setPokemonPokedexFlavorTextNr((prev) => prev)
		} else if (
			pokemonPokedexFlavorTextNr === pokemonPokedexFlavorTexts.length - 1 &&
			n === +1
		) {
			setPokemonPokedexFlavorTextNr((prev) => prev)
		} else {
			setPokemonPokedexFlavorTextNr((prev) => prev + n)
		}
	}

	const handlePokemonNr = (n) => {
		if (pokemonPokedexNr === 1 && n === -1) {
			setPokemonPokedexNr((prev) => prev)
		} else if (pokemonPokedexNr === 1017 && n === +1) {
			setPokemonPokedexNr((prev) => prev)
		} else {
			setPokemonPokedexNr((prev) => prev + n)
		}
	}

	const handlePokemonSearchNr = (n) => {
		if (pokemonSearchNr.length === 4) {
			return
		}
		setPokemonSearchNr((prev) => `${prev}${n}`)
	}

	
	const handlePokemonSearch = () => {
		if (!pokemonSearchNr) {
			return
		}
		const newPokemonSearchNr = Number(pokemonSearchNr) > 1017 ? 1017 : Number(pokemonSearchNr)
		setPokemonSearchNr(() => String(newPokemonSearchNr));
		setPokemonPokedexNr(() => newPokemonSearchNr)
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
		setPokemonPokedexFlavorTextNr(() => 0)
	}, [pokemonPokedexNr])

	useEffect(() => {
		if (pokemonPokedexData.species) {
			setPokemonPokedexFlavorTexts([])
			const flavorTextsBuffer = []
			for (
				let i = 0;
				i < Object.keys(pokemonPokedexData.species.flavor_text_entries).length;
				i++
			) {
				if (
					pokemonPokedexData.species.flavor_text_entries[i].language.name ==
					'en'
				) {
					if (
						!flavorTextsBuffer.includes(
							formatFlavor(
								pokemonPokedexData.species.flavor_text_entries[i].flavor_text
							)
						)
					) {
						flavorTextsBuffer.push(
							formatFlavor(
								pokemonPokedexData.species.flavor_text_entries[i].flavor_text
							)
						)
					}
				}
			}
			setPokemonPokedexFlavorTexts((prev) => [...prev, ...flavorTextsBuffer])
		}
	}, [pokemonPokedexData])

	useEffect(() => {
		if (pokemonPokedexFlavorTexts.length > 0) {
			setPokemonPokedexFlavorTextsTranslated([])
			const translationBuffer = []
			const translate = async () => {
				for (let i = 0; i < pokemonPokedexFlavorTexts.length; i++) {
					const string = pokemonPokedexFlavorTexts[i]
					const stringLang = 'en'
					const targetLang = 'pt-br'
					const url =
						'https://translate.googleapis.com/translate_a/single?client=gtx&sl=' +
						stringLang +
						'&tl=' +
						targetLang +
						'&dt=t&q=' +
						string
					try {
						const response = await fetch(url)
						if (response.ok) {
							const data = await response.json()
							let fullResponse = ''
							for (let j = 0; j < data[0].length; j++) {
								fullResponse = `${fullResponse}${data[0][j][0]}`
							}
							translationBuffer.push(fullResponse)
						} else {
							console.log('Error', response.statusText)
						}
					} catch (error) {
						console.log('ERROR', error)
					}
				}
				setPokemonPokedexFlavorTextsTranslated((prev) => [
					...prev,
					...translationBuffer,
				])
			}
			translate()
		}
	}, [pokemonPokedexFlavorTexts])

	useEffect(() => {
		setPokemonDataExtra({})
		const dataBuffer = {}
		const stringLang = 'en'
		const targetLang = 'pt-br'
		dataBuffer.weight = pokemonPokedexData.pokemon?.weight
			? `${pokemonPokedexData.pokemon?.weight / 10}Kg`
			: '????'
		dataBuffer.height = pokemonPokedexData.pokemon?.height
			? `${pokemonPokedexData.pokemon?.height / 10}m`
			: '????'
		dataBuffer.generation = pokemonPokedexData.species?.generation.name
			? (pokemonPokedexData.species?.generation.name || '')
					.replace('generation-', '')
					.toUpperCase()
			: '????'
		dataBuffer.isBaby = pokemonPokedexData.species?.is_baby ? 'Sim' : 'Não'
		dataBuffer.isLegendary = pokemonPokedexData.species?.is_legendary
			? 'Sim'
			: 'Não'
		dataBuffer.isMythical = pokemonPokedexData.species?.is_mythical
			? 'Sim'
			: 'Não'
		const fetchGenera = async () => {
			if (
				pokemonPokedexData.species.genera &&
				pokemonPokedexData.species.genera !== null &&
				pokemonPokedexData.species.genera !== undefined
			) {
				let string
				for (let i = 0; i < pokemonPokedexData.species.genera.length; i++) {
					if (pokemonPokedexData.species.genera[i].language.name === 'en') {
						string = pokemonPokedexData.species.genera[i].genus
					}
				}
				const url =
					'https://translate.googleapis.com/translate_a/single?client=gtx&sl=' +
					stringLang +
					'&tl=' +
					targetLang +
					'&dt=t&q=' +
					string
				try {
					const response = await fetch(url)
					if (response.ok) {
						const data = await response.json()
						dataBuffer.genera = data[0][0][0]
					} else {
						console.log('Error', response.statusText)
					}
				} catch (error) {
					console.log('Error', error)
				}
			} else {
				dataBuffer.genera = '????'
			}
			setPokemonDataExtra((prev) => ({
				...prev,
				...dataBuffer,
			}))
		}
		const fetchHabitat = async () => {
			if (
				pokemonPokedexData.species.habitat &&
				pokemonPokedexData.species.habitat !== null &&
				pokemonPokedexData.species.habitat !== undefined
			) {
				const string = pokemonPokedexData.species?.habitat.name
				const url =
					'https://translate.googleapis.com/translate_a/single?client=gtx&sl=' +
					stringLang +
					'&tl=' +
					targetLang +
					'&dt=t&q=' +
					string
				try {
					const response = await fetch(url)
					if (response.ok) {
						const data = await response.json()
						dataBuffer.habitat = capitalize(data[0][0][0])
					} else {
						console.log('Error', response.statusText)
					}
				} catch (error) {
					console.log('Error', error)
				}
			} else {
				dataBuffer.habitat = '????'
			}
			setPokemonDataExtra((prev) => ({
				...prev,
				...dataBuffer,
			}))
		}
		fetchGenera()
		fetchHabitat()
		setPokemonDataExtra((prev) => ({
			...prev,
			...dataBuffer,
		}))
	}, [pokemonPokedexData])

	const DataExtraKeys = Object.keys(pokemonDataExtra).map((key) => key)

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
									{showPokemonDisplayImg ? (
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
									) : (
										<div
											className='pokedex-left-side-mid-screen-display-extra-data'
											style={{
												border: ` 2px solid ${switchPokemonColors(
													pokemonPokedexData.species?.color.name
												)}`,
											}}
										>
											{DataExtraKeys.map((i) => (
												<div
													key={i}
													className='pokedex-left-side-mid-screen-display-extra-data-container'
												>
													<div className='pokedex-left-side-mid-screen-display-extra-data-key'>
														{`${i
															.replace('weight', 'Peso')
															.replace('height', 'Altura')
															.replace('generation', 'Geração')
															.replace('isBaby', 'Bebê')
															.replace('isLegendary', 'Lendário')
															.replace('isMythical', 'Mítico')
															.replace('genera', 'Generô')}:`}
													</div>
													<div className='pokedex-left-side-mid-screen-display-extra-data-value'>
														{pokemonDataExtra[i]}
													</div>
												</div>
											))}
										</div>
									)}
									<div className='pokedex-left-side-mid-screen-display-info-container'>
										<div className='pokedex-left-side-mid-screen-display-name'>
											<div
												className='pokedex-left-side-mid-screen-display-name-text'
												title={'Nome do Pokemon'}
											>
												{pokemonPokedexData.pokemon?.species.name}
											</div>
										</div>
										<div className='pokedex-left-side-mid-screen-display-number'>
											<div
												className='pokedex-left-side-mid-screen-display-number-text'
												title={'Número do Pokemon'}
											>
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
									<div
										className='pokedex-left-side-mid-screen-bottom-button'
										title={'Mostrar Informações Extra/Mostrar Imagem'}
										onClick={() =>
											setShowPokemonDisplayImg(!showPokemonDisplayImg)
										}
									></div>
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
											title={'Status Base do Pokemon'}
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
							<div
								title={'Próximo Pokemon'}
								className='pokedex-left-side-bottom-dpad-xaxis-left'
								onClick={() => handlePokemonNr(+1)}
							></div>
							<div
								title={'Pokemon Anterior'}
								className='pokedex-left-side-bottom-dpad-xaxis-right'
								onClick={() => handlePokemonNr(-1)}
							></div>
							<div
								title={'Próxima Entrada'}
								className='pokedex-left-side-bottom-dpad-yaxis-top'
								onClick={() => handleFlavor(+1)}
							></div>
							<div
								title={'Entrada Anterior'}
								className='pokedex-left-side-bottom-dpad-yaxis-bot'
								onClick={() => handleFlavor(-1)}
							></div>
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
							<div className='pokedex-right-side-mid-display-container'>
								<div
									className='pokedex-right-side-mid-display'
									title={'Entrada Pokedex'}
								>
									<div className='pokedex-right-side-mid-display-text'>
										{pokemonPokedexFlavorTextsTranslation
											? pokemonPokedexFlavorTexts[pokemonPokedexFlavorTextNr]
											: pokemonPokedexFlavorTextsTranslated[
													pokemonPokedexFlavorTextNr
											  ]
											? pokemonPokedexFlavorTextsTranslated[
													pokemonPokedexFlavorTextNr
											  ]
											: '...'}
									</div>
								</div>
								<div className='pokedex-right-side-mid-display-search-container'>
									{'Procurar'}
									<div className='pokedex-right-side-mid-display-search-value'>{`: ${pokemonSearchNr}`}</div>
								</div>
								<div
									className='pokedex-right-side-mid-display-flavor-translate'
									title='Traduzir/Translate'
									onClick={() =>
										setPokemonPokedexFlavorTextsTranslation(
											!pokemonPokedexFlavorTextsTranslation
										)
									}
								>
									<MdGTranslate />
								</div>
								<div
									className='pokedex-right-side-mid-display-flavor-total'
									title={'Entrada Atual/Total de Entradas'}
								>
									{`[${
										pokemonPokedexFlavorTexts.length > 0
											? pokemonPokedexFlavorTextNr + 1
											: 0
									}/${pokemonPokedexFlavorTexts.length}]`}
								</div>
							</div>
							<div className='pokedex-right-side-mid-buttons-container'>
								{DIVSBUTTONS.map((i) => (
									<div
										key={i}
										className='pokedex-right-side-mid-buttons'
										title={`Botão ${i}`}
										onClick={() => handlePokemonSearchNr(i)}
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
								<div className='pokedex-right-side-bottom-top-button-left'>
									<div
										className='pokedex-right-side-bottom-top-button-left-icon'
										onClick={() => handlePokemonSearch()}
									>
										<AiOutlineEnter />
									</div>
								</div>
								<div
									className='pokedex-right-side-bottom-top-button-right'
									onClick={() => setPokemonSearchNr(() => '')}
								>
									<div className='pokedex-right-side-bottom-top-button-right-icon'>
										<IoBackspaceOutline />
									</div>
								</div>
								<div className='pokedex-right-side-bottom-top-yellow-light'>
									<div className='pokedex-right-side-bottom-top-yellow-light-reflection'></div>
								</div>
							</div>
							<div className='pokedex-right-side-bottom-bot-displays-container'>
								<div className='pokedex-right-side-bottom-bot-display-left'>
									<div
										className='pokedex-right-side-bottom-bot-display-left-color'
										style={{
											backgroundColor: pokemonPokedexData.pokemon?.types[0]
												?.type.name
												? `var(--${pokemonPokedexData.pokemon?.types[0].type.name})`
												: 'var(--bg1)',
										}}
									>
										<div className='pokedex-right-side-bottom-bot-display-left-text'>
											{pokemonPokedexData.pokemon?.types[0].type.name
												? pokemonPokedexData.pokemon?.types[0].type.name
												: ''}
										</div>
									</div>
								</div>
								<div className='pokedex-right-side-bottom-bot-display-right'>
									<div
										className='pokedex-right-side-bottom-bot-display-right-color'
										style={{
											backgroundColor: pokemonPokedexData.pokemon?.types[1]
												?.type.name
												? `var(--${pokemonPokedexData.pokemon?.types[1].type.name})`
												: 'var(--bg1)',
										}}
									>
										<div className='pokedex-right-side-bottom-bot-display-right-text'>
											{pokemonPokedexData.pokemon?.types[1]?.type.name
												? pokemonPokedexData.pokemon?.types[1].type.name
												: ''}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Pokedex
