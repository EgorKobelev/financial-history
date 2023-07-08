import { useRef, useState } from "react";
import styles from "./tooltip.module.css";
import ReactDOM from "react-dom";

const modalContainer = document.getElementById("root");

const ToolTip = ({ children, tooltip, width, className }) => {
    const container = useRef(null);
    const [coords, setCoords] = useState(null);
    return (
        <>
            <div
                style={{ width: width }}
                ref={container}
                onMouseEnter={({ clientX, clientY }) => {
                    if (!container.current) return;
                    setCoords({
                        x: clientX + "px",
                        y: window.scrollY + clientY + 5 + "px",
                    });
                }}
                onMouseLeave={() => {
                    if (coords && tooltip) {
                        setCoords(null);
                    }
                }}
                className={`${styles.tooltip__container} ${className}`}
            >
                {children}
            </div>
            {tooltip && coords
                ? ReactDOM.createPortal(
                      <p id="tooltip" style={{ top: coords.y, left: coords.x }} className={styles.tooltip__text_container}>
                          {tooltip}
                      </p>,
                      modalContainer
                  )
                : null}
        </>
    );
};

export default ToolTip;
