'use strict'
import { useState, useEffect } from 'react'
import './MenuGeneration.css'

const MenuGeneration = ({ replaceUrl, setPokemonGen }) => {
	const [pokeGen, setPokeGen] = useState(() => {
		const GEN = localStorage.getItem('genSet')
		if (GEN !== null) {
		return parseInt(GEN,10)
		}
		else {
			localStorage.setItem('genSet', 0)
			return 0
		}
	})

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
		return {}
	})

	const TOTALAGEN = pokemonsGenEx.length
	const DIVSGENEX = []
	const fulfilDivsGen = (n) => {
		for (let i = 0; i < n; i++) {
			DIVSGENEX.push(i)
		}
	}
	fulfilDivsGen(TOTALAGEN)

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

	const handleGen = (n) => {
		let gen = ''
		setPokeGen(() => n)
		switch (n) {
			case 0:
				gen = 151
				break
			case 1:
				gen = 251
				break
			case 2:
				gen = 386
				break
			case 3:
				gen = 494
				break
			case 4:
				gen = 649
				break
			case 5:
				gen = 721
				break
			case 6:
				gen = 809
				break
			case 7:
				gen = 905
				break
			case 8:
				gen = 1017
				break
			default:
				break
		}
		localStorage.setItem('genSet', n)
		localStorage.setItem('pokemonGen', gen)
		setPokemonGen(() => gen)
	}

	const toRoman = (n) => {
		let roman = {
			L: 50,
			XL: 40,
			X: 10,
			IX: 9,
			V: 5,
			IV: 4,
			I: 1,
		}
		let res = ''
		for (let p in roman) {
			while (n >= roman[p]) {
				res += p
				n -= roman[p]
			}
		}
		return res
	}

	return (
		<>
			<div className='guesser-menu-right'>
				<div className='guesser-menu-gen-container'>
					<div className='guesser-menu-gen-title'>GeN</div>
					{DIVSGENEX.map((i) => (
						<div
							key={i}
							className='guesser-menu-gen'
						>
							<div
								className='btn guesser-menu-gen-text'
								onClick={() => handleGen(i)}
								style={{
									color: 'var(--yellow1)',
									backgroundColor: pokeGen >= i ? 'var(--bg0)' : '',
								}}
								title={`Escolher pokemons até a ${i+1}º Geração`}
							>
								{toRoman(i + 1)}
							</div>
							<div className='guesser-menu-gen-starters'>
								<img
									src={pokemonsGenExData[i]?.[0]?.sprites.front_default}
									alt={pokemonsGenExData[i]?.[0]?.name}
								/>
								<img
									src={pokemonsGenExData[i]?.[1]?.sprites.front_default}
									alt={pokemonsGenExData[i]?.[1]?.name}
								/>
								<img
									src={pokemonsGenExData[i]?.[2]?.sprites.front_default}
									alt={pokemonsGenExData[i]?.[2]?.name}
								/>
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	)
}

export default MenuGeneration
