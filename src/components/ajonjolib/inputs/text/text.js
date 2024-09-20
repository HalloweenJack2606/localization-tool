import React from "react";
import styles from "./text.module.css";

export default function Text({ value, onChange, className, style, disabled, placeholder, type }) {
    return (
        <div className={styles.container}>
            <input style={style} className={className} type={type ? type : 'text'} placeholder={placeholder} value={value} disabled={disabled} onChange={(e) => {
                if(onChange) onChange(e.target.value);
            }}/>
        </div>
    )
}