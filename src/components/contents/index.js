import React, {useContext, useEffect, useState} from 'react';
import ProjectContext from "../../context/project";
import TableInput from "./table_input";
import styles from './styles.module.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEllipsis} from "@fortawesome/free-solid-svg-icons";
import {defaultRow} from "../../utils/table_utils";
import {openModal} from "../ajonjolib/toasts/toast/toast";

function TableHeader({project, setFilters, filters}) {
    return (
        <React.Fragment>
            <tr>
                {project?.columns?.map((column, index) => {
                    return (
                        <th key={index}>
                            <div className={'d-flex align-items-center'}>
                                {column.value === 5 && <div className={`lang-icon lang-icon-${column?.flag_icon} me-1`}></div>}
                                {column.value === 2 && <div className={`lang-icon lang-icon-${project?.source_language?.value} me-1`}></div>}
                                {column.value === 2 ?
                                    <div className={`d-flex align-items-center`}>
                                        <div className={styles.columnDesc}>(Source {project?.source_language?.value})</div>
                                        <div>{project?.source_language?.name}</div>
                                    </div> :
                                    (column.value === 5 ?
                                        <div className={`d-flex align-items-center`}>
                                            <div className={styles.columnDesc}>(Target {column?.flag_icon})</div>
                                            <div>{column?.name}</div>
                                        </div> :
                                        <div>{column.name}</div>)
                                }
                            </div>
                        </th>
                    )
                })}
                <th className={styles.newColumn} onClick={() => openModal('add_column')}>+</th>
            </tr>
            <tr>
                {project?.columns?.map((column, index) => {
                    if(column.name === "#") return <th key={index} className={styles.filterInput}/>;
                    return (
                        <th key={index} className={styles.filterInput}>
                            <input placeholder={'Type to filter...'} value={filters[column.internal]} onChange={(event) => {
                                setFilters({...filters, [column.internal]: event.target.value});
                            }}/>
                        </th>
                    )
                })}
            </tr>
        </React.Fragment>
    )
}

function Entries({project, rows, setRows, filteredRows}) {
    return (
        <React.Fragment>
            {filteredRows?.map((row, rowIndex) => {
                return (
                    <tr key={rowIndex}>
                        {project?.columns?.map((column, index) => {
                            if(column.name === '#') return (<td key={index} className={styles.idColumn}>{rowIndex + 1}</td>);
                            const data = row[column.internal]?.data;
                            return (
                                <td key={index}><TableInput data={data} rows={rows} setRows={setRows} index={rowIndex} column={column}/></td>
                            )
                        })}
                    </tr>
                )
            })}
        </React.Fragment>
    )
}

function NewEntry({project, rows, setRows}) {
    const createEntry = () => {
        setRows((prev) => {
            return [
                ...prev,
                defaultRow
            ]
        })
    }

    return (
        <tr>
            {project?.columns?.map((column, index) => {
                if(column.name !== '#') return null
                return (
                    <td key={index} className={styles.idColumn}>
                        <div className={styles.newButton}>
                            <div style={{paddingBottom: '5px'}} onClick={createEntry}>+</div>
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
    const [rows, setRows] = useState([]);
    const [filteredRows, setFilteredRows] = useState([]);
    const [filters, setFilters] = useState({});

    useEffect(() => {
        let filtered = [...rows];
        Object.entries(filters).forEach(([column, text]) => {
            filtered = filtered.filter((x) => x[column]?.data.toLowerCase().includes(text.toLowerCase()));
        })
        setFilteredRows(filtered);
    }, [filters, rows]);

    useEffect(() => {
        const retrievedRows = JSON.parse(localStorage.getItem('rows'));
        if(retrievedRows) {
            setRows(retrievedRows);
        }
    }, []);

    return (
        <div className={styles.container}>
            <table>
                <thead>
                <TableHeader project={project} setFilters={setFilters} filters={filters} />
                </thead>
                <tbody>
                <Entries project={project} rows={rows} setRows={setRows} filteredRows={filteredRows}/>
                <NewEntry project={project} rows={rows} setRows={setRows} />
                </tbody>
            </table>
        </div>
    )
}