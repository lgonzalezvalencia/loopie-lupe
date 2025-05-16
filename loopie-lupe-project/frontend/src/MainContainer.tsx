import { useState } from "react";
import Header from "./header/Header";
import { Outlet } from "react-router-dom";
import "./MainContainer.css";

function MainContainer() {
    const [onNewClick, setOnNewClick] = useState<() => void>(() => () => {});

    return (
    <div className="main-container">
        <Header onNewClick={onNewClick} />
        <Outlet context={{ setOnNewClick }}/>
    </div>
    );
}

export default MainContainer;