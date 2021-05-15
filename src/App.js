import React, { useState, useEffect } from 'react'

import './global.css'

import {} from 'rxjs'
import {} from 'rxjs/operators'

function App() {
	const [state, setState] = useState()

	useEffect(() => {}, [])

	return (
		<>
			<h1>Alarm Clock</h1>
			<div className="display">{state}</div>
		</>
	)
}

export default App
