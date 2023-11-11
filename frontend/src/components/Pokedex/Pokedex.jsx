'use strict'
import { useState, useEffect } from 'react'
import './Pokedex.css'

const Pokedex = () => {
	return (
		<>
			<div className='pokedex-container'>
				<div className='pokedex-left-side'>
					<div className='pokedex-left-side-top'></div>
					<div className='pokedex-left-side-mid'></div>
					<div className='pokedex-left-side-bottom'></div>
				</div>
				<div className='pokedex-mid-section'>
					<div className='pokedex-mid-section-top'>
						<div className='pokedex-mid-section-top-junction'></div>

					</div>
					<div className='pokedex-mid-section-mid'>
					</div>
					<div className='pokedex-mid-section-bottom'>
						<div className='pokedex-mid-section-bot-junction'></div>
					</div>
				</div>
				<div className='pokedex-right-side'>
					<div className='pokedex-right-side-top'></div>
					<div className='pokedex-right-side-mid'></div>
					<div className='pokedex-right-side-bottom'></div>
				</div>
			</div>
		</>
	)
}

export default Pokedex
