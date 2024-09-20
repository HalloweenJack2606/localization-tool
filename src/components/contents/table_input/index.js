import React, {useEffect, useRef, useState} from "react";
import styles from "./styles.module.css";

export default function TableInput({data, setData}) {
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
            if(setData) setData(value);
        }
    }

    const select = () => {
        setIsSelected(true);
        setValue(data);
    }

    return (
        <div className={styles.container} ref={divRef} onClick={select}>
            {isSelected ? (
                    <div style={{ display: 'flex', width: '100%', height: '100%' }}>
                        <input value={value} onInput={(event) => {
                            setValue(event.target.value);
                        }} type={'text'}/>
                    </div>) :
                <div>{data}</div>
            }
        </div>
    )
}