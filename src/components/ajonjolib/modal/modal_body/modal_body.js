import React from "react";

export default function ModalBody({children}) {
    return (
        <div style={{
            padding: '24px 32px',
        }}>
            {children}
        </div>
    )
}