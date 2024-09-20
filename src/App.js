import './App.css';
import {BrowserRouter as Router} from "react-router-dom";
import RouteContainer from "./routes";
import {useEffect, useState} from "react";
import ProjectContext from "./context/project";

function App() {
    const [project, setProject] = useState(null);

    useEffect(() => {
        const found = localStorage.getItem('project');
        if(found) setProject(JSON.parse(found));
    }, []);

    return (
        <div className="App">
            <ProjectContext.Provider value={project}>
                <Router>
                    <RouteContainer/>
                </Router>
            </ProjectContext.Provider>
        </div>
    );
}

export default App;
