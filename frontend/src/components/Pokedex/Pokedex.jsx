'use strict'
import { useState, useEffect } from 'react'
import './Pokedex.css'

const Pokedex = () => {
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
					<div className='pokedex-left-side-mid'></div>
					<div className='pokedex-left-side-bottom'></div>
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
									style={{ fill: 'var(--red0)', stroke: 'black'}}
								/>
								<polyline
									points='0,150 115,150 140,80 378,80'
									style={{ fill: 'none', stroke: 'black', strokeWidth: '3' }}
								/>
							</svg>
						</div>
					</div>
					<div className='pokedex-right-side-mid'></div>
					<div className='pokedex-right-side-bottom'></div>
				</div>
			</div>
		</>
	)
}

export default Pokedex
