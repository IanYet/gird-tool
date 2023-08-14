import { useEffect, useRef } from "react"
import { initView } from "./view";

function Scene(props) {
    const elRef = useRef()

    useEffect(() => {
        initView(elRef.current)
     },[])
    return <div ref={elRef}></div>
}

export { Scene }
