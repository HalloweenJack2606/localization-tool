import React from "react";
import styles from './index.module.css';

export default function Date({changeFrom, changeTo, valueFrom, valueTo, className, style}) {
    return (
        <div className={`${styles.container} ${className}`} style={style}>
            <input type={'date'} placeholder={'dd/mm/aaaa'} value={valueFrom} onChange={(event) => {
                changeFrom(event.target.value);
            }}/>
        </div>
    )
}