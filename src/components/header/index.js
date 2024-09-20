import React from 'react';
import styles from './styles.module.css';

export default function Header() {
    return (
        <div className={styles.container}>
            <div>Localization Tool</div>

            <div className={'d-flex'}>
                <div>Project Name</div>
                <div>Other</div>
            </div>
        </div>
    )
}