import React, {useContext} from 'react';
import Header from "../../components/header";
import ProjectContext from "../../context/project";
import ProjectCreation from "../../components/project/creation";
import CreateProjectModal from "../../components/project/modals/create_project";
import Contents from "../../components/contents";


export default function Home() {
    const project = useContext(ProjectContext)

    return (
        <div>
            <Header/>
            <CreateProjectModal/>
            {project ? <Contents/> : <ProjectCreation/>}
        </div>
    );
}