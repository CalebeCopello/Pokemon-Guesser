'use strict'
import { useState, useEffect } from 'react'

const MenuGeneration = ({pokemonsGenExData}) => {


	return (
		<>
			<div className='guesser-menu-left'>
				<div className='guesser-menu-gen-container'>
					<div className='guesser-menu-gen-title'>Geração</div>
					<div className='guesser-menu-gen-i'>
						<div className='guesser-menu-gen-i-text'>I</div>
					</div>
					<div className='guesser-menu-gen-i-starters'>
						{pokemonsGenExData[0]?.[0]?.name}
						{pokemonsGenExData[0]?.[1]?.name}
						{pokemonsGenExData[0]?.[2]?.name}
					</div>
				</div>
			</div>
		</>
	)
}

export default MenuGeneration
