import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave} from "@fortawesome/free-solid-svg-icons";

export default function ModalFooter({children}) {
    return (
        <div className={'d-flex justify-content-between px-4 py-3'}>
            <div>{children}</div>
            <div
                className={'d-flex justify-content-center align-items-center'}
                style={{
                    color: '#FFFFFF',
                    backgroundColor: '#F32735',
                    borderRadius: '6px',
                    padding: '8px 16px',
                    cursor: 'pointer',
                    userSelect: 'none',
            }}>
                <FontAwesomeIcon icon={faSave} size={'xl'} color={'#FFFFFF'} className={'me-2'}/>
                <div>Guardar</div>
            </div>
        </div>
    )
}