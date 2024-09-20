import React from "react";
import styles from './index.module.css';

export default function TimePicker({onChange, value}) {
    return (
        <div className={styles.container}>
            <input aria-label="Time" type="time" value={value} onChange={(event) => {
                if(onChange) {
                    onChange(event.target.value);
                }
            }}/>
        </div>
    )
}