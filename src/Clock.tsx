import React, {useEffect, useState} from "react";

const Clock = () => {

    const [time, setTime] = useState(new Date()); // Initialize with current time

    useEffect(() => {
        // Update the time every minute
        const intervalId = setInterval(() => {
            setTime(new Date()); // Update time every minute
        }, 1000); // 1000ms = 1 s

        // Cleanup interval when component unmounts
        return () => clearInterval(intervalId);
    }, []);

    const getTime = (): string => {
        let hour: number = time.getHours();
        let minute: number = time.getMinutes();
        if (minute < 10 && hour < 10){
            return `0${hour}:0${minute}`;
        }

        if (minute < 10) {
            return `${hour}:0${minute}`;
        }else {
            return `${hour}:${minute}`;
        }
    }

    return <p className="time">
        {getTime()}
    </p>
}

export default Clock;