import * as THREE from 'three'

const CONTROL_MODE = {
	MOVE: 0,
	EDIT: 1,
}

const viewState = {
	renderer: new THREE.WebGLRenderer(),
	scene: new THREE.Scene(),
	camera: new THREE.OrthographicCamera(),
	size: 1,
	controlMode: CONTROL_MODE.MOVE,
	isMove: false,
	isColor: false,
}

window.viewData = viewState

const gridState = {}

export { CONTROL_MODE, viewState }
