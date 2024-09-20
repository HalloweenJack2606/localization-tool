import React from "react";
import styles from './button.module.css';

export default function Button({onSubmit, disabled, className, style, name, variant, icon}) {

    const getClass = () => {
        if(variant === 'secondary') {
            return styles.secondary;
        } else if(variant === 'success') {
            return styles.success;
        } else if(variant === 'danger') {
            return styles.danger;
        } else if(variant === 'warning') {
            return styles.warning;
        } else if(variant === 'info') {
            return styles.info;
        } else if(variant === 'light') {
            return styles.light;
        } else if(variant === 'dark') {
            return styles.dark;
        } else if(variant === 'link') {
            return styles.link;
        } else {
            return styles.primary;
        }
    }

    return (
        <div className={className} onClick={() => {
            if(!disabled) {
                if(onSubmit) onSubmit();
            }
        }}>
            <div className={`${styles.container} ${getClass()}`} style={style}>
                {icon && <img src={icon} alt={'icon'} className={'me-2'} style={{width: '22px', height: 'auto'}}/>}
                <div style={{whiteSpace: 'nowrap'}}>{name}</div>
            </div>
        </div>
    )
}