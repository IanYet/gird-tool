import * as THREE from 'three'
import { screenToThree } from './utils'
import { viewState, CONTROL_MODE, fullGridStore, coloredGridStore } from './store'

function render() {
	const { renderer, camera, scene } = viewState
	requestAnimationFrame(render)

	renderer.render(scene, camera)
}

window.onresize = (ev) => {
	const { renderer } = viewState
    computeCamera()
    computeGrid()
	renderer.setSize(window.innerWidth, window.innerHeight)
}

function computeCamera() {
	const { camera } = viewState
	camera.left = (-window.innerWidth * viewState.size) / 100
	camera.right = (window.innerWidth * viewState.size) / 100
	camera.top = (window.innerHeight * viewState.size) / 100
	camera.bottom = (-window.innerHeight * viewState.size) / 100
	camera.updateProjectionMatrix()
}

function computeGrid() {
	const { camera } = viewState
	const [width, height] = [camera.right, camera.top]
	const { x: offsetX, y: offsetY } = camera.position
	const [minX, maxX, minY, maxY] = [
		offsetX - width,
		offsetX + width,
		offsetY - height,
		offsetY + height,
	]

	for (let key in fullGridStore) {
		const [x, y] = key.split('_').map((value) => Number(value))

		if (x < minX || x > maxX || y < minY || y > maxY) {
			removeRect(x, y)
		}
	}

	for (let x = Math.floor(minX); x < Math.ceil(maxX); ++x) {
		for (let y = Math.floor(minY); y < Math.ceil(maxY); ++y) {
			if (!fullGridStore[`${x}_${y}`]) {
				addRect(x, y)
			}
		}
	}

	// Object.keys(fullGridStore)
}
/**
 *
 * @param {HTMLElement} el
 */
function initView(el) {
	const { renderer, camera, scene, group } = viewState

	renderer.setSize(window.innerWidth, window.innerHeight)
	renderer.setClearColor('#282c34')
	el.appendChild(renderer.domElement)

	camera.near = 1
	camera.far = 100
	computeCamera()
	camera.position.set(0, 0, 10)

	group.position.set(0.5, 0.5, 0)
    scene.add(group)
    
    computeGrid()

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
		if (size > 2) size = 2

		viewState.size = size
        computeCamera()
        computeGrid()
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
            computeGrid()
		}
	}
}

function addRect(x, y) {
	const { materialMap, group } = viewState
	const matType = coloredGridStore[`${x}_${y}`] ?? '#ffffff'
	const rect = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.9), materialMap[matType])

	rect.position.set(x, y, 0)
	group.add(rect)

	fullGridStore[`${x}_${y}`] = rect
}

function removeRect(x, y) {
	const { group } = viewState
	const rect = fullGridStore[`${x}_${y}`]

	delete fullGridStore[`${x}_${y}`]

	group.remove(rect)
	rect.geometry.dispose()
}

function colorRect(x, y, matType) {
	const { materialMap, group } = viewState
	const rect = fullGridStore[`${x}_${y}`]

	rect.material = materialMap[matType]

	if (matType === '#ffffff') {
		delete coloredGridStore[`${x}_${y}`]
	} else {
		coloredGridStore[`${x}_${y}`] = matType
	}
}

export { initView, initControl }
