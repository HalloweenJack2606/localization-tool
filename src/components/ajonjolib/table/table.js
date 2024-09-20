import React, {useEffect, useState} from "react";
import styles from './table.module.css';
//import axiosInstance from "../../../AxiosInstance";

function getValueFromString(object, accessString) {
    let accessParts = accessString.split(".");
    let value = object;

    for (let i = 0; i < accessParts?.length; i++) {
        if (!value) {
            return "";
        }
        let accessPart = accessParts[i];
        value = value[accessPart];
    }

    return value;
}

export default function Table({cols, withIndex, model, rows}) {
    const query = '';
    const [timer, setTimer] = useState(null);

    return (
        <div className={styles.container}>
            <div style={{
                height: 'calc(100% - 100px)', overflowY: 'scroll', position: 'relative'
            }}>
                <div className={styles.body}>
                    <table className={`${styles.table} table`}>
                        <thead>
                        <tr>
                            {withIndex && <th style={{paddingLeft: '20px', color: '#BBBEC2'}}>N°</th>}
                            {cols?.map((col, index) => (
                                <th key={index}>
                                    {col?.header && <>{col.header(col.title)}</>}
                                    {col?.title && !col?.header && <div className={'d-flex justify-content-between'}>
                                        <div style={{textAlign: 'left', width: '100%', whiteSpace: 'nowrap', padding: '14px'}}>{col.title}</div>
                                    </div>}
                                </th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {rows?.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {withIndex && <td style={{color: '#F32735', fontWeight: '600', paddingLeft: '20px'}}>
                                    <div style={{height: '100%'}} className={'d-flex align-items-center'}>{rowIndex + 1}</div>
                                </td>}
                                {cols?.map((col, colIndex) => (
                                    <td key={colIndex}>
                                        <div className={styles.customtd}>
                                            <div style={{width: '100%'}}>
                                            {col.image ?
                                                <img src={getValueFromString(row,col.image.url)} alt={col.title} width={"50px"} height={"50px"} style={{borderRadius: "5px", objectFit: "contain", backgroundColor: "#F7F8F9"}}/>
                                                :
                                                <>
                                                    { col.code ? <>{col.code(row, getValueFromString(row, col.key))}</>
                                                        :
                                                        <div>{getValueFromString(row, col.key)}</div>
                                                    }
                                                </>
                                            }
                                            </div>
                                        </div>
                                    </td>
                                ))}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}