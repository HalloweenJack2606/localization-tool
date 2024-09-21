import React, {useContext} from 'react';
import Header from "../../components/header";
import ProjectContext from "../../context/project";
import ProjectCreation from "../../components/project/creation";
import CreateProjectModal from "../../components/project/modals/create_project";
import Contents from "../../components/contents";
import AddColumnModal from "../../components/contents/add_column";


export default function Home() {
    const project = useContext(ProjectContext)

    return (
        <div>
            <Header/>
            <CreateProjectModal/>
            <AddColumnModal/>
            {project ? <Contents/> : <ProjectCreation/>}
        </div>
    );
}