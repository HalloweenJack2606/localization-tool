import React from "react";
import styles from './index.module.css';
import { CustomProvider, DateRangePicker as RSDateRange } from 'rsuite';
import {esES} from "rsuite/locales";
import {faChevronDown} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const IconCalendar = () => {
    return (<FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon>)
}

const configuration = {
    sunday: 'D',
    monday: 'L',
    tuesday: 'M',
    wednesday: 'Mi',
    thursday: 'J',
    friday: 'V',
    saturday: 'S',
    ok: 'Guardar',
    formattedMonthPattern: 'MMMM yyyy',
};

export default function DateRangePicker({onChange}) {
    return (
        <div className={styles.container}>
            <div style={{ width: '100%' }}>
                <CustomProvider locale={esES}>
                    <RSDateRange
                        locale={configuration}
                        showHeader={false}
                        showOneCalendar
                        ranges={[]}
                        format="dd/MM/yyyy"
                        showMeridian={true}
                        caretAs={IconCalendar}
                        onChange={onChange}
                        placeholder="Seleccione un rango"
                    />
                </CustomProvider>
            </div>
        </div>
    )
}