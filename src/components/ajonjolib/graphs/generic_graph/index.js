import styles from "../../../../screens/dashboard/components/evolutive/index.module.css";
import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import React from "react";

export default function GenericGraph({title, data, format, unit, legend = true}) {
    return (
        <div className={styles.graphContainer} style={{padding: '0'}}>
            {legend &&
                <div className={'d-flex justify-content-between'}>
                    <div>{title}</div>
                    <div style={{flexBasis: '40%'}}>
                        <div className={'d-flex align-items-center justify-content-between'}>
                            {format.map((entry) => {
                                return (
                                    <div className={'d-flex align-items-center'}>
                                        <div style={{backgroundColor: entry.hex, borderRadius: '50%', width: '20px', height: '20px'}}/>
                                        <div className={'ps-1'} style={{whiteSpace: 'nowrap', fontFamily: 'Poppins, sans-serif', fontSize: '12px', letterSpacing: '0', fontWeight: '400', lineHeight: '18px'}}>{entry.name}</div>
                                    </div>
                                )})
                            }
                        </div>
                    </div>
                </div>
            }
            <ResponsiveContainer width={'100%'} height={300} style={{padding: '0', paddingRight: '20px'}}>
                <AreaChart width={'100%'} height={300} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <defs>
                        {format.map((entry) => {
                            return (
                                <linearGradient id={entry.key} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={entry.hex} stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor={entry.hex} stopOpacity={0}/>
                                </linearGradient>
                            )})
                        }
                    </defs>
                    <Tooltip/>
                    <XAxis dataKey="name" />
                    <YAxis
                        padding={{top: 30}}
                        label={{ value: unit, position: 'insideTop', fill: '#807f7f', fontSize: '14px', fontWeight: '600'}}
                    />
                    {
                        format.map((entry) => {
                            return <Area dataKey={entry.key} stroke={entry.hex} fillOpacity={1} fill={`url(#${entry.key})`} />
                        })
                    }
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}
