import { useRef, useState } from "react";
import React from "react";
import styles from "./tooltip.module.css";
import ReactDOM from "react-dom";

const modalContainer = document.getElementById("root");

const ToolTip = ({ children, tooltip }) => {
    const container = useRef(null);
    const [coords, setCoords] = useState(null);
    return (
        <>
            <div
                ref={container}
                onMouseEnter={({ clientX, clientY }) => {
                    console.log(document.documentElement.scrollHeight);
                    if (!container.current) return;
                    setCoords({
                        x: clientX + "px",
                        y: window.pageYOffset + clientY + 10 + "px",
                    });
                }}
                onMouseLeave={() => {
                    if (coords && tooltip) {
                        setCoords(null);
                    }
                }}
                className={styles.tooltip__container}
            >
                {children}
            </div>
            {tooltip && coords
                ? ReactDOM.createPortal(
                      <div id="tooltip" style={{ top: coords.y, left: coords.x }} className={styles.tooltip__text_container}>
                          {tooltip}
                      </div>,
                      modalContainer
                  )
                : null}
        </>
    );
};

export default ToolTip;
