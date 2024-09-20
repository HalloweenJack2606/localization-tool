import React from "react";

export default function ModalHeader({title, subtitle}) {
    return (
        <div
            className={'d-flex justify-content-start align-items-center px-3'}
            style={{
                backgroundColor: '#F32735', color: '#FFFFFF',
                height: '50px', minHeight: '50px',
                fontSize: '16px', fontWeight: '500',
                borderRadius: '16px 16px 0 0',
        }}>
            <div>{title}</div>
            <div
                style={{
                    margin: '0 8px',
                    height: '90%', width: '1px',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '50%',
                }}
            />
            <div style={{
                backgroundColor: '#F86D77', color: '#FFFFFF',
                padding: '0 8px', borderRadius: '9px',
            }}>{subtitle}</div>
        </div>
    )
}