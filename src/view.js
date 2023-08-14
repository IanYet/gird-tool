import * as THREE from 'three'

const viewState = {
	renderer: new THREE.WebGLRenderer(),
	scene: new THREE.Scene(),
	camera: new THREE.OrthographicCamera(),
	size: 1,
}

window.viewData = viewState

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

window.onwheel = (ev) => {
	let size = viewState.size + (0.1 * viewState.size * ev.deltaY) / Math.abs(ev.deltaY)

	if (size < 0.1) size = 0.1

	viewState.size = size
}

/**
 *
 * @param {HTMLElement} el
 */
function initView(el) {
	const { renderer, camera, scene } = viewState

	renderer.setSize(window.innerWidth, window.innerHeight)
	renderer.setClearColor('#345')
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

export { viewState, initView }
