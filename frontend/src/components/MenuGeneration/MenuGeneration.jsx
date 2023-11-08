'use strict'
import { useState, useEffect } from 'react'

const MenuGeneration = () => {
	const [pokemonsGenEx] = useState(() => {
		return [
			[1, 4, 7],
			[152, 155, 158],
			[252, 255, 258],
			[387, 390, 393],
			[495, 498, 501],
			[650, 653, 656],
			[722, 725, 728],
			[810, 813, 816],
			[906, 909, 912],
		]
	})
	const [pokemonsGenExData, setPokemonsGenExData] = useState(() => {
	return	{}
	})

	useEffect(() => {
		const getPokemonsGen = async () => {
			const buffer = {}
			for (let i = 0; i < pokemonsGenEx.length; i++) {
				buffer[i] = { ...buffer[i] }
				for (let j = 0; j < pokemonsGenEx[i].length; j++) {
					try {
						const responseEx = await fetch(
							`https://pokeapi.co/api/v2/pokemon/${pokemonsGenEx[i][j]}`
						)
						if (responseEx.ok) {
							const responseExJson = await responseEx.json()
							buffer[i][j] = responseExJson
						}
					} catch (error) {
						console.log(error)
					}
				}
			}
			setPokemonsGenExData(buffer)
		}

		getPokemonsGen()
	}, [])

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
