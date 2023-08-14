import { Scene } from './Scene'
import './App.css'
import { Panel } from './Panel'
import { RecoilRoot } from 'recoil'

function App() {
    return (
		<RecoilRoot>
            <Scene />
            <Panel />
		</RecoilRoot>
	)
}

export default App
