import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import gsap from "gsap";

const StyledContainer = styled.div`
    height: 100vh;
    width: 100vw;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 50;
    background-color: #d0b0b0;
    #load-percent {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        width: 100%;
        color: white;
        font-weight: 700;
        font-size: 5vw;
        font-style: italic;
        mix-blend-mode: difference;
    }
    #bar {
        position: absolute;
        top: 0;
        left: 0;
        height: 100vh;
        width: 100%;
    }
    #barconfirm {
        height: 100vh;
        background-color: darkslategray;
    }
`;

export default function Loader() {
    let barconfirm = useRef(null);
    let percent = useRef(null);
    const [count, setCount] = useState(0);
    let loadtl = gsap.timeline({ paused: true });

    const countHandler = () => {
        let newCount = count + 1;
        setCount(newCount);
    };

    useEffect(() => {
        if (count < 100) {
            setTimeout(countHandler, 25);
        } else {
            gsap.to(percent, {
                duration: 0.5,
                delay: 0.5,
                opacity: 0,
                zIndex: -10,
            });
            gsap.to(barconfirm, {
                duration: 0.5,
                delay: 1,
                x: "100%",
                ease: "circ.inOut",
            });
        }
    });

    return (
        <StyledContainer>
            <div className="progress">
                <div id="bar">
                    <div
                        id="barconfirm"
                        style={{ width: `${count}%` }}
                        ref={(el) => (barconfirm = el)}
                    ></div>
                </div>
            </div>
            <div id="load-percent" ref={(el) => (percent = el)}>
                {count}%
            </div>
        </StyledContainer>
    );
}
