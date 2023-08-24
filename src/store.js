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

	group: new THREE.Group(),
	lineColor: '#ffffff',
	grid: new THREE.GridHelper(1, 1, '#ffffff', '#ffffff'),
	materialMap: {
		'#ffffff': new THREE.MeshBasicMaterial({ color: '#ffffff' }),
	},
}

window.viewData = viewState

const fullGridStore = {}

const coloredGridStore = {}

window.gridData = { fullGridStore, coloredGridStore }

export { CONTROL_MODE, viewState, fullGridStore, coloredGridStore }
