import React, { useState, useEffect } from 'react'

import './global.css'

import { interval, concat, of, Subject } from 'rxjs'
import { startWith, scan, takeWhile, repeatWhen } from 'rxjs/operators'

const countdown$ = interval(1000).pipe(
	startWith(5),
	scan((time) => time - 1),
	takeWhile((time) => time > 0)
)

const action$ = new Subject()
action$.subscribe(console.log)

const observable$ = concat(countdown$, of('Wake up Sleepy head! 🥳🎉')).pipe(
	repeatWhen(() => action$)
)

function App() {
	const [state, setState] = useState()

	useEffect(() => {
		const subscription = observable$.subscribe(setState)

		return () => subscription.unsubscribe()
	}, [])

	return (
		<>
			<h1>Alarm ⏰</h1>
			<div className="display">{state}</div>
			<button className="snooze" onClick={() => action$.next('snooze')}>
				Snooze 🤧
			</button>
		</>
	)
}

export default App
