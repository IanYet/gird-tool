import * as THREE from 'three'
import { screenToThree } from './utils'
import { viewState, CONTROL_MODE } from './store'

function render() {
	const { renderer, camera, scene } = viewState
	requestAnimationFrame(render)

	camera.left = (-window.innerWidth * viewState.size) / 100
	camera.right = (window.innerWidth * viewState.size) / 100
	camera.top = (window.innerHeight * viewState.size) / 100
	camera.bottom = (-window.innerHeight * viewState.size) / 100
	camera.updateProjectionMatrix()

	renderer.render(scene, camera)
}

window.onresize = (ev) => {
	const { renderer } = viewState

	renderer.setSize(window.innerWidth, window.innerHeight)
}

/**
 *
 * @param {HTMLElement} el
 */
function initView(el) {
	const { renderer, camera, scene } = viewState

	renderer.setSize(window.innerWidth, window.innerHeight)
	renderer.setClearColor('#282c34')
	el.appendChild(renderer.domElement)

	camera.left = (-window.innerWidth * viewState.size) / 100
	camera.right = (window.innerWidth * viewState.size) / 100
	camera.top = (window.innerHeight * viewState.size) / 100
	camera.bottom = (-window.innerHeight * viewState.size) / 100
	camera.near = 1
	camera.far = 100
	camera.updateProjectionMatrix()
	camera.position.set(0, 0, 10)

	const gridHelper = new THREE.GridHelper(100, 100, 0xffffff, 0xaaaaaa)
	gridHelper.rotateX(Math.PI / 2)
	scene.add(gridHelper)

	render()
}

/**
 *
 * @param {HTMLElement} el
 */
function initControl(el) {
	el.onwheel = (ev) => {
		let size = viewState.size + (0.1 * viewState.size * ev.deltaY) / Math.abs(ev.deltaY)

		if (size < 0.1) size = 0.1

		viewState.size = size
	}

	el.oncontextmenu = (ev) => ev.preventDefault()

	// onpointer event cannot be trigged twice when there is one button is down
	el.onmousedown = (ev) => {
		if (viewState.controlMode === CONTROL_MODE.EDIT && ev.button === 0 && !ev.ctrlKey) {
			viewState.isColor = true
			viewState.isMove = false
		} else {
			viewState.isColor = false
			viewState.isMove = true
		}
	}

	el.onpointerup = (ev) => {
		viewState.isColor = false
		viewState.isMove = false
	}

	el.onpointerleave = (ev) => {
		viewState.isColor = false
		viewState.isMove = false
	}

	el.onmousemove = (ev) => {
		if (viewState.isMove) {
			const movementXY = screenToThree(new THREE.Vector2(ev.movementX, ev.movementY))
			viewState.camera.position.add(new THREE.Vector3(movementXY.x, movementXY.y, 0))
		}
	}
}

export { viewState, initView, initControl }
