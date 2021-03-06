import React, { useState, useEffect } from 'react'

import './global.css'

import { interval, concat, of, Subject } from 'rxjs'
import {
	startWith,
	scan,
	takeWhile,
	repeatWhen,
	share,
	filter,
	takeUntil,
} from 'rxjs/operators'

const countdown$ = interval(1000)
	.pipe(
		startWith(5),
		scan((time) => time - 1),
		takeWhile((time) => time > 0)
	)
	.pipe(share())

const action$ = new Subject()

action$.subscribe(console.log)

const snooze$ = action$.pipe(filter((action) => action === 'snooze'))

const dismiss$ = action$.pipe(filter((action) => action === 'dismiss'))

const snoozableAlarm$ = concat(
	countdown$,
	of('Wake up Sleepy head! ๐ฅณ๐')
).pipe(repeatWhen(() => snooze$))

const observable$ = concat(
	snoozableAlarm$.pipe(takeUntil(dismiss$)),
	of('Have a nice day! ๐ค')
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
				Snooze ๐คง
			</button>

			<button className="dismiss" onClick={() => action$.next('dismiss')}>
				Dismiss ๐คจ
			</button>
		</>
	)
}

export default App
