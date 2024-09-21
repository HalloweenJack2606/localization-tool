import React, {useContext, useState} from 'react';
import ProjectContext from "../../context/project";
import TableInput from "./table_input";
import styles from './styles.module.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEllipsis, faPlus} from "@fortawesome/free-solid-svg-icons";

function TableHeader({project}) {
    return (
        <React.Fragment>
            <tr>
                {project?.columns?.map((column, index) => {
                    if (!column?.enabled) return null;
                    return (
                        <th key={index}>{column.name}</th>
                    )
                })}
            </tr>
            <tr>
                {project?.columns?.map((column, index) => {
                    if (!column?.enabled) return null;
                    return (
                        <th key={index}>filter</th>
                    )
                })}
            </tr>
        </React.Fragment>
    )
}

function Entries({project, rows}) {

    const modifyEntry = (value) => {

    }

    return (
        <React.Fragment>
            {rows?.map((row, rowIndex) => {
                return (
                    <tr key={rowIndex}>
                        {project?.columns?.map((column, index) => {
                            if (!column?.enabled) return null;
                            if(column.name === '#') return (<td key={index} className={styles.idColumn}>{rowIndex + 1}</td>);
                            const data = row[column.internal]?.data;
                            return (
                                <td key={index}><TableInput data={data} setData={modifyEntry}/></td>
                            )
                        })}
                    </tr>
                )
            })}
        </React.Fragment>
    )
}

function NewEntry({project, rows}) {
    return (
        <tr>
            {project?.columns?.map((column, index) => {
                if(column.name !== '#') return null
                return (
                    <td key={index} className={styles.idColumn}>
                        <div className={styles.newButton}>
                            <div style={{paddingBottom: '5px'}}>+</div>
                            <div><FontAwesomeIcon icon={faEllipsis} size={"xs"}/></div>
                        </div>
                    </td>
                );
            })}
        </tr>
    )
}

export default function Contents() {
    const project = useContext(ProjectContext);
    const [rows, setRows] = useState([{
        string_id: {
            data: "test",
            last_modified: Date.now(),
        }
    }]);

    return (
        <div className={styles.container}>
            <table>
                <thead>
                <TableHeader project={project} />
                </thead>
                <tbody>
                <Entries project={project} rows={rows} />
                <NewEntry project={project} rows={rows}/>
                </tbody>
            </table>
        </div>
    )
}