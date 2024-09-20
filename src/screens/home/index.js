import React, {useContext, useEffect} from 'react';
import Header from "../../components/header";
import ProjectContext from "../../context/project";
import ProjectCreation from "../../components/project/creation";
import CreateProjectModal from "../../components/project/modals/create_project";
import Contents from "../../components/contents";
import LanguageSelect from "../../components/ajonjolib/inputs/language_select";


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