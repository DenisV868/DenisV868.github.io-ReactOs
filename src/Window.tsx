import React from "react";

const Window = ({app}) => {

    return(<div className={"window"}>
        <div><button className={"minimize"}>-</button><button><img src="/icons8-square-30.png" alt=""/></button></div>
        {app}
    </div>)

}

export default Window;