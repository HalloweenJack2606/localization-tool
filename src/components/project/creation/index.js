import React from 'react';
import styles from './styles.module.css';
import {openModal} from "../../ajonjolib/toasts/toast/toast";

export default function ProjectCreation() {
    const createProject = () => {
        openModal("project_create");
    }

    const importProject = () => {
        openModal("project_import");
    }

    return (
        <div className={styles.container}>
            <div className={styles.button} onClick={() => createProject()}>
                <div>Create Project</div>
            </div>
            <div className={'my-2'}>or</div>
            <div className={styles.button}>
                <div>Import Project</div>
            </div>
        </div>
    )
}
