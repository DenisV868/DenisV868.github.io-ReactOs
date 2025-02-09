import React, {useEffect, useState} from "react";

import {useNavigate} from "react-router-dom";

const Opener = (to:string) => {
    let navigate = useNavigate()
    return () => {
        navigate(to);
    };
}


const Docs = () => {

    const [position, setPosition] = useState({x: 0, y: 0});
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

        setPosition({x, y});
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


    return <div className="settings-app-div">
        <div className={"filemanager-app"} draggable onDragStart={handleDragStart} onDrop={handleDrop}
             onDragOver={(e: any) => e.preventDefault()}
             style={{position: 'absolute', left: position.x, top: position.y, cursor: dragging ? "grabbing" : "grab",}}>
            <div className={"line2"}><img src="/folder.png" alt="" className={"logo2"}/>
                <p></p>
                <button className={"minimize2"}>-</button>
                <button className={"square2"}><img src="/icons8-square-30.png" alt="" className={"square-icon"}/>
                </button>
                <button onClick={Opener("/")} className={"cross2"}>X</button>
            </div>

            <div className={"file-menu"}>
                <p style={{position:"relative", top:"10px" }} className={"homedr"} onClick={Opener("/fileManager/user/home")}><img src="/home-button_icon-icons.com_72700.png" alt=""/>Home</p>
                <p className={"docsdr"}  style={{backgroundColor: "lightgrey"}}><img src="/google-docs.png" alt=""/>Docs</p>
            </div>
            <div className={"tool-line"}>
                <input type="text" className={"nav-file-bar"} value={"/home/denis/"} style={{width:"470px"}}/><button className={"file-search-btn"}><img src="/icons8-magnifying-glass-30.png" alt=""/></button>
            </div>
            <div className={"drcontent"}>

            </div>

        </div>
        <div className={"icon-on-panel"}>
            <img src="/folder.png" alt="" className={"icon-filemanager"}/>
        </div>
    </div>
}

export default Docs;