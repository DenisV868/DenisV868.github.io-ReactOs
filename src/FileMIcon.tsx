import React from "react";
import {useNavigate} from "react-router-dom";

const Opener = (to:string) => {
    let navigate = useNavigate()
    return () => {
        navigate(to);
    };
}


const FileMIcon = () => {

   return(<p className={"icon-on-panel-fileM"} onClick={Opener("/fileManager/user/home")}>
       <img src="/folder.png" alt="" className={"icon-filemanager"}/>
   </p>)

}

export default FileMIcon;























































