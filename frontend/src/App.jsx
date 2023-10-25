'use strict'
import {useState} from 'react'
import './App.css'

function App() {
  const [pokemon, setPokemon] = useState()

	// function async getPokemons() => {
  //   const bulba = await fetch('https://pokeapi.co/api/v2/pokemon/1')
  //   const bulbaJson = await bulba.json()
  //   return bulbaJson.stringify()
	// }

	return (
		<>
			<div className='teste-container'>
				<p className='mono'>Hello World!</p>
				<p className='sanSerif'>Hello World!</p>
				<p className='serif'>Hello World!</p>
			</div>
		</>
	)
}

export default App
