import { useRef } from "react";
import styles from "./tooltip.module.css";

const ToolTip = ({ children, tooltip }) => {
    const tooltipRef = useRef(null);
    const container = useRef(null);

    return (
        <div
            ref={container}
            onMouseEnter={({ clientX }) => {
                if (!tooltipRef.current || !container.current) return;
                const { left } = container.current.getBoundingClientRect();

                tooltipRef.current.style.left = clientX - left + "px";
            }}
            className={styles.tooltip__container}
        >
            {children}
            {tooltip ? (
                <div ref={tooltipRef} className={styles.tooltip__text_container}>
                    {tooltip}
                </div>
            ) : null}
        </div>
    );
};

export default ToolTip;
