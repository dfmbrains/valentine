import React, {useEffect, useRef, useState} from "react";
import HeartPNG from './assets/heart.png';

function App() {
    const targetRef = useRef()
    const keyRef = useRef()
    const [positions, setPositions] = useState({})
    const [active, setActive] = useState('')

    const handleDragStart = (e) => {
        e.target.style.boxShadow = '4px 4px 8px 0px rgba(34, 60, 80, 0.2)'
    }

    const handleDragEnd = (e) => {
        e.target.style.boxShadow = 'unset'

        setPositions({x: e.clientX, y: e.clientY});
    }

    const handleDragOver = (e) => {
        e.dataTransfer.effectAllowed = "move";
        e.preventDefault()
    }

    const handleDragDrop = (e) => {
        e.preventDefault()
    }

    useEffect(() => {
        if (targetRef && JSON.stringify(positions) !== '{}') {
            const targetGetBoundingClientRect = targetRef.current.getBoundingClientRect()
            const x = targetGetBoundingClientRect.left + (targetGetBoundingClientRect.width / 2)
            const y = targetGetBoundingClientRect.top + (targetGetBoundingClientRect.height / 2)

            const keyGetBoundingClientRect = keyRef.current.getBoundingClientRect()
            const ax = keyGetBoundingClientRect.left + (keyGetBoundingClientRect.width / 2)
            const ay = keyGetBoundingClientRect.top + (keyGetBoundingClientRect.height / 2)

            if ((x + 20 > ax && x - 20 < ax) && (y + 20 > ay && y - 20 < ay)) {
                setActive('opened')
            }
        }
    }, [positions])

    return (
        <main className="main">
            <div className="quiz">
                <img src={HeartPNG} alt="LOVE" className={`quiz__img ${active}`}/>
                <div className="quiz__target" ref={targetRef}>
                    <div className="quiz__target_item"/>
                </div>
                <div className="quiz__key ${active}"
                     ref={keyRef}
                     draggable={true}
                     onDragStart={(e) => handleDragStart(e)}
                     onDragEnd={(e) => handleDragEnd(e)}
                     onDragOver={(e) => handleDragOver(e)}
                     onDrop={(e) => handleDragDrop(e)}
                     style={positions?.x && positions?.y ? {
                         left: positions.x,
                         top: positions.y,
                     } : {}}
                />
                {active && (
                    <div className="surprise">
                        <h1>Я тебя люблю жанм !!!</h1>
                    </div>
                )}
            </div>
        </main>
    );
}

export default App;
