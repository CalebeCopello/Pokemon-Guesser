'use strict'
import { useState, useEffect } from 'react'
import pokedex from '/pokedex-300x300.png'
import { CgPokemon } from 'react-icons/cg'
import './MenuPokedex.css'

const MenuPokedex = ({
	startGame,
	attempts,
	DIVSATTEMPTS,
	showPokemonAnswers,
	switchPokemonColors,
	pokemonSpecies,
	score,
	pokemonAnswers,
	replaceUrl,
	capitalize,
	showPokedex,
	setShowPokedex,
	setPokemonPokedexNr,
}) => {
	return (
		<>
			<div className='guesser-menu-left'>
				<div className='guesser-menu-container'>
					<div className='guesser-menu-start-container'>
						<button
							className='btn'
							disabled={attempts > 0}
							onClick={startGame}
							title='Começar Jogo'
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
								onClick={() => setShowPokedex(!showPokedex)}
							/>
						</button>
					</div>
					<div className='guesser-menu-pokemons-answer-container'>
						{DIVSATTEMPTS.map((i) => (
							<div
								key={i}
								className='guesser-menu-pokemons-answer'
								style={{
									cursor: showPokemonAnswers[i] ? 'pointer' : 'wait',
									backgroundColor: showPokemonAnswers[i]
										? switchPokemonColors(pokemonSpecies[i]?.color.name)
										: '',
								}}
								title={
									showPokemonAnswers[i]
										? capitalize(pokemonAnswers[i]?.species.name)
										: 'Não definido'
								}
								onClick={() => {
									if (showPokemonAnswers[i]) {
										setShowPokedex(true)
										setPokemonPokedexNr(pokemonAnswers[i].id)
									}
								}}
							>
								<div
									className='guesser-menu-pokemons-answer-score'
									style={{
										color: score[i] ? 'var(--blue0)' : 'var(--red0)',
										visibility: showPokemonAnswers[i] ? 'visible' : 'hidden',
									}}
								>
									<CgPokemon />
								</div>
								<div className='guesser-menu-pokemons-answer-front'>
									{showPokemonAnswers[i] ? (
										<img
											src={replaceUrl(pokemonAnswers[i]?.sprites.front_default)}
											alt={pokemonAnswers[i]?.species.name}
										/>
									) : (
										'?'
									)}
								</div>
								<div className='guesser-menu-pokemons-answer-back'>
									{showPokemonAnswers[i] ? (
										<img
											src={replaceUrl(pokemonAnswers[i]?.sprites.back_default)}
											alt={pokemonAnswers[i]?.species.name}
										/>
									) : (
										'?'
									)}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	)
}

export default MenuPokedex
