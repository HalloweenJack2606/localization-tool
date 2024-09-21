import React, {useEffect, useRef, useState} from "react";
import styles from "./styles.module.css";

export default function TableInput({data, rows, setRows, index, column}) {
    const [value, setValue] = useState(data);
    const [isSelected , setIsSelected] = useState(false);
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

    const select = () => {
        setIsSelected(true);
        setValue(data);
    }

    return (
        <div className={styles.container} ref={divRef} onClick={select}>
            {isSelected ? (
                    <div style={{ display: 'flex', width: '100%', height: '100%' }}>
                        <input value={value} min={0} step={1} onInput={(event) => {
                            setValue(event.target.value);
                        }} type={column.type}/>
                    </div>) :
                <div>{data}</div>
            }
        </div>
    )
}