import React, {useContext} from 'react';
import styles from './styles.module.css';
import ProjectContext from "../../context/project";

function ProjectData() {
    const project = useContext(ProjectContext);

    return (
        <div className={'d-flex'}>
            <div>{project?.name}</div>
            <div className={'ms-3 p-2'} style={{
                backgroundColor: 'red', borderRadius: '8px', cursor: 'pointer', userSelect: 'none'
            }} onClick={() => {
                localStorage.clear();
                window.location.reload();
            }}>
                Delete Data
            </div>
        </div>
    )
}

export default function Header() {
    return (
        <div className={styles.container}>
            <div className={'me-5'}>Localization Tool</div>

            <ProjectData/>
        </div>
    )
}