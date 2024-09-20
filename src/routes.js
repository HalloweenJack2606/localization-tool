import { Routes, Route } from "react-router-dom";
import {useEffect} from "react";
import Home from "./screens/home";


function LoginRedirect() {
    useEffect(() => {
        window.location.replace('/');
    }, []);
    return (<div></div>);
}


export default function RouteContainer() {
    return (
        <Routes>
            <Route path={'/'} element={<Home/>}/>
            <Route path="*" element={<LoginRedirect/>}/>
        </Routes>
    )
}