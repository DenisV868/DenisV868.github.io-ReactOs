import React from "react";

import {useNavigate} from "react-router-dom";

const Opener = (to:string) => {
    let navigate = useNavigate()
    return () => {
        navigate(to);
    };
}



let apps:string[] = ["shutdown", "reboot", "settings"];
let appIcons:string[] = ["/switch.png","/interface.png","/icons8-settings-30.png"];

const  Menu = () =>{

    let navigate = useNavigate()

    const handleShutdown = () => {

        window.close()//browser will not do it

    }

    const handleReboot = () => {
        navigate("/")
        window.location.reload()
    }

    const  OpenFileManager = () => {
        navigate("/fileManager/user/home");
    }


    return(<div className={"menu-menu"}>
        <div className={"menu-action"}>
            <div className={"item-1"}>
                <p className="settings" onClick={Opener("/settings")}>
                    <img src={appIcons[2]} alt={apps[2]}/>
                </p>
            </div>
            <div className={"item-2"}>
                <p className="reboot" onClick={handleReboot}>
                    <img src={appIcons[1]} alt={apps[1]}/>
                </p>
            </div>
            <div className={"item-3"}>
                <p className="shutdown" onClick={handleShutdown}>
                    <img src= {appIcons[0]} alt= {apps[0]} />
                </p>
            </div>
            <div className={"item-4"}>
                <p onClick={OpenFileManager}>
                    <img src="/folder.png" alt=""/>
                    <p>File manger</p>
                </p>
            </div>
        </div>
    </div>)
}

export default Menu;