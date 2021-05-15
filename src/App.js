import React, { useState, useEffect } from 'react'

import './global.css'

import { interval, concat, of, Subject } from 'rxjs'
import { startWith, scan, takeWhile, repeatWhen, share } from 'rxjs/operators'

const countdown$ = interval(1000)
	.pipe(
		startWith(5),
		scan((time) => time - 1),
		takeWhile((time) => time > 0)
	)
	.pipe(share())

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
			<h1>Alarm Clock</h1>
			<div className="display">{state}</div>
			<button className="snooze" onClick={() => action$.next('snooze')}>
				Snooze 🤧
			</button>

			<button className="dismiss" onClick={() => action$.next('dismiss')}>
				Dismiss 🤨
			</button>
		</>
	)
}

export default App
