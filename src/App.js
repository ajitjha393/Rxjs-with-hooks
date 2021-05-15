import React, { useState, useEffect } from 'react'

import './global.css'

import { interval } from 'rxjs'
import {} from 'rxjs/operators'

const observable$ = interval(1000)

function App() {
	const [state, setState] = useState()

	useEffect(() => {
		observable$.subscribe(setState)
	}, [])

	return (
		<>
			<h1>Alarm Clock</h1>
			<div className="display">{state}</div>
		</>
	)
}

export default App
