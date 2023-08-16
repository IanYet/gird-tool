import { useEffect, useRef } from 'react'
import { initControl, initView } from './view'

function Scene(props) {
	const elRef = useRef()

	useEffect(() => {
		initView(elRef.current)
		initControl(elRef.current)
	}, [])
	return <div ref={elRef}></div>
}

export { Scene }
