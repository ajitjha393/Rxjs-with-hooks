import React, { useState, useEffect } from 'react'

import './global.css'

import { interval, pipe } from 'rxjs'
import { startWith, scan, takeWhile } from 'rxjs/operators'

const countdown$ = interval(1000).pipe(
	startWith(5),
	scan((time) => time - 1),
	takeWhile((time) => time > 0)
)

function App() {
	const [state, setState] = useState()

	useEffect(() => {
		const subscription = countdown$.subscribe(setState)

		return () => subscription.unsubscribe()
	}, [])

	return (
		<>
			<h1>Alarm Clock</h1>
			<div className="display">{state}</div>
		</>
	)
}

export default App
