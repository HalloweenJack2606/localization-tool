import React, {useEffect, useState} from "react";
import styles from './switch.module.css'

export default function Switch({value, onChange, id}) {
    const [isActive, setIsActive] = React.useState(value);
    const [firstUpdate, setFirstUpdate] = useState(true);

    useEffect(() => {
        if(firstUpdate) {
            setFirstUpdate(false);
            return;
        }
        setIsActive(value);
    }, [isActive, firstUpdate, onChange, value]);

    return (
        <div className={styles.container}>
            <div className={styles.background}>
                <div className={`${styles.switch} ${isActive === true ? styles.active : ''}`} onClick={(event) => {
                    event.stopPropagation();
                    const oldActive = isActive;
                    setIsActive((prev) => !prev)
                    if(onChange) onChange(!oldActive);
                }}>
                    <div className={styles.toggle}/>
                </div>
                <div className={'px-2'}>{isActive ? 'Activo' : 'Inactivo'}</div>
            </div>
        </div>
    );
}