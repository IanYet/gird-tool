import { Vector2 } from 'three'
import { viewState } from './store'

/**
 *
 * @param {Vector2} movemenXY
 */
function screenToThree(movemenXY) {
	const { camera } = viewState
	const screenXY = new Vector2(window.innerWidth, window.innerHeight)
    const threeXY = new Vector2(camera.left - camera.right, camera.top - camera.bottom)

    return movemenXY.multiply(threeXY).divide(screenXY)
}

function threeToScreen() {}

export { screenToThree, threeToScreen }
