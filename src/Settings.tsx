import React, {useEffect, useState} from "react";

import {useNavigate} from "react-router-dom";

const Opener = (to:string) => {
    let navigate = useNavigate()
    return () => {
        navigate(to);
    };
}


const Settings = () => {

    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [dragging, setDragging] = useState(false); // State to track dragging


    // Handle the dragging start
    const gridSize = 1; // Define grid size (e.g., 100px)

    // Handle the drag start
    const handleDragStart = (e) => {
        const rect = e.target.getBoundingClientRect();
        e.dataTransfer.setData("startX", e.clientX - rect.left);
        e.dataTransfer.setData("startY", e.clientY - rect.top);
    };

    // Handle dropping and snapping to grid
    const handleDrop = (e) => {
        const startX = e.dataTransfer.getData("startX");
        const startY = e.dataTransfer.getData("startY");

        // Calculate new position based on where the drop happened
        let x = e.clientX - startX;
        let y = e.clientY - startY;

        // Snap to the nearest grid cell
        x = Math.round(x / gridSize) * gridSize;
        y = Math.round(y / gridSize) * gridSize;

        // Get the footer's position and height
        const footer = document.querySelector("footer");
        const footerTop = footer ? footer.getBoundingClientRect().top : window.innerHeight;

        // Get the height of the settings div
        const divHeight = e.target.offsetHeight;

        // Prevent the div from being dropped below the footer
        if (y + divHeight > footerTop) {
            y = footerTop - divHeight; // Adjust the y position to stay above the footer
        }

        setPosition({ x, y });
        setDragging(false); // Stop dragging
    };

    useEffect(() => {
        // Attach global event listeners for dragover and drop on the window
        const handleDragOver = (e) => {
            e.preventDefault(); // Allow dropping
        };

        // Attach listeners
        window.addEventListener("dragover", handleDragOver);
        window.addEventListener("drop", handleDrop);

        // Cleanup on unmount
        return () => {
            window.removeEventListener("dragover", handleDragOver);
            window.removeEventListener("drop", handleDrop);
        };
    }, []);


    return (
       (<div  className="settings-app-div">
            <div className={"settings-app"} draggable onDragStart={handleDragStart} onDrop={handleDrop} onDragOver={(e:any) => e.preventDefault()} style={{ position: 'absolute',left: position.x, top: position.y,cursor: dragging ? "grabbing" : "grab",}}>
                <div className={"line"}><img src="/icons8-settings-16.png" alt="" className={"logo"}/>
                    <button className={"minimize"}>-</button>
                    <button className={"square"}><img src="/icons8-square-30.png" alt=""/></button>
                    <button onClick={Opener("/")} className={"cross"}>X</button>
                </div>
                <div className={"settings-menu"}>
                    <div className={"profile"}>
                        <div className={"username"}>Denis Vimr</div>
                    </div>
                    <div className={"info"}>
                        <div className={"sys-info-bookmark"}>Info</div>
                    </div>
                    <div className={"home"} onClick={Opener("/settings/wallpapers")}>
                        <div className={"home-bookmark"} onClick={Opener("/settings/wallpapers")}>Wallpapers</div>
                    </div>
                </div>
                <div className={"system-info"}>
                    <h1>System-info</h1>
                </div>
                <div className={"os-info"}>
                    <p>OS: React OS</p>
                    <p>Version: FG252</p>
                </div>
            </div>
            <div className={"icon-on-panel"}>
                <img src="/icons8-settings-30.png" alt=""/>
            </div>
        </div>
    ))

}

export default Settings;