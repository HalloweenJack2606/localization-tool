import React from "react";
import styles from './modal.module.css';

export default function Modal({children, close, className, style, title, desc, padding}) {
    return (
        <div className={styles.container}>
            <div className={styles.backdrop} onClick={close}/>
            <div className={`${styles.modal} ${className}`} style={style}>
                <div className={styles.header}>
                    <div>{title}</div>
                    {desc &&
                        <div className={'d-flex'}>
                            <div className={styles.divider}/>
                            <div className={styles.desc}>{desc}</div>
                        </div>
                    }
                </div>
                <div style={{
                    color: '#8B8B8B', textAlign: 'left',
                    padding: padding ? padding : "30px 30px"
                }}>
                    {children}
                </div>
            </div>
        </div>
    );
}