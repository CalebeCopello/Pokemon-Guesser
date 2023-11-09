'use strict'
import { useState, useEffect } from 'react'
import { CgPokemon } from 'react-icons/cg'
import './Guesser.css'


const Guesser = ({counter, DIVSATTEMPTS, score, pokemonsData, correctPokemonNr, pokemonsNr, attempts, tryAttempt, capitalize, replaceUrl}) => {

	return (
		<>
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
								{DIVSATTEMPTS.map((i) => (
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
							{pokemonsData[correctPokemonNr] ? (
								<img
									src={replaceUrl(pokemonsData[correctPokemonNr].sprites?.other['official-artwork'].front_default)}
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
									disabled={!pokemonsData[i] || attempts === 0}
								>
									{pokemonsData[i]
										? capitalize(pokemonsData[i]?.species.name)
										: `Opção ${i}`}
								</button>
							))}
						</div>
					</div>
				</div>
		</>
	)
}

export default Guesser