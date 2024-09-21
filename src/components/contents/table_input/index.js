import React, {useEffect, useRef, useState} from "react";
import styles from "./styles.module.css";

export default function TableInput({data, rows, setRows, index, column}) {
    const [value, setValue] = useState(data);
    const [isSelected , setIsSelected] = useState(false);
    const [pillColor, setPillColor] = useState("red");
    const divRef = useRef(null);

    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    const handleOutsideClick = (event) => {
        if (divRef.current && !divRef.current.contains(event.target)) {
            setIsSelected(false);
        }
    }

    useEffect(() => {
        if(!(rows || setRows || index || column || data)) return;
        const updatedRows = [...rows];
        updatedRows[index] = {
            ...updatedRows[index],
            [column.internal]: {
                ...updatedRows[index][column.internal],
                data: value,
                last_modified: Date.now()
            }
        };
        setRows(updatedRows);
        localStorage.setItem('rows', JSON.stringify(updatedRows));
    }, [value])

    useEffect(() => {
        if(column.internal.toLowerCase().includes("dst")) {
            if(value === "" || value === null || value === undefined) {
                setPillColor("red");
            } else if(rows[index].lang_src.last_modified > rows[index][column.internal]?.last_modified) {
                setPillColor("gold");
            } else setPillColor("green");
        } else {
            setPillColor("transparent");
        }
    }, [rows]);

    const select = () => {
        setIsSelected(true);
        setValue(data);
    }

    const onInput = (val) => {
        if(column.internal === "record_id") {
            val = val.replace(/\s/g, "_");
            val = val.toUpperCase();
        }
        setValue(val);
    }

    return (
        <div className={styles.container} ref={divRef} onClick={select}>
            <div className={styles.alertPill}><div style={{backgroundColor: pillColor}}/></div>
            {isSelected ? (
                    <div style={{ display: 'flex', width: '100%', height: '100%' }}>
                        <input value={value} min={1} step={1} onInput={(e) => {
                            onInput(e.target.value);
                        }} type={column.type || "text"}/>
                    </div>) :
                <div>{data}</div>
            }
        </div>
    )
}