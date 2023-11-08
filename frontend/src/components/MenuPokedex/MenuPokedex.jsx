'use strict'
import { useState, useEffect } from 'react'
import pokedex from '/pokedex-300x300.png'
import { CgPokemon } from 'react-icons/cg'

const MenuPokedex = ({startGame, attempts, DIVSATTEMPTS, showPokemonAnswers, switchPokemonColors, pokemonSpecies, score, pokemonAnswers, replaceUrl}) => {
	return (
		<>
			<div className='guesser-menu-right'>
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
											alt={pokemonAnswers[i]?.name}
										/>
									) : (
										'?'
									)}
								</div>
								<div className='guesser-menu-pokemons-answer-back'>
									{showPokemonAnswers[i] ? (
										<img
											src={replaceUrl(pokemonAnswers[i]?.sprites.back_default)}
											alt={pokemonAnswers[i]?.name}
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
