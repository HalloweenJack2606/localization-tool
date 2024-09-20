import React from "react";

export default function Label({children, style, className}) {
    return (
        <div className={className} style={{
            color: "#5863B4", fontFamily: 'Lexend Variable, sans-serif',
            fontWeight: "400", fontSize: '20px',
            paddingBottom: "0.2rem", textAlign: 'left',
            ...style
        }}>
            {children}
        </div>
    )
}