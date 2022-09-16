import React, { useState, useEffect } from "react";
import axios from "axios";
import ClassSelect from "./ClassSelect";
import { useRef } from "react";

const Auction = () => {

    const classRef = useRef();

    const [leaderList, setLeaderList] = useState([]);
    const [classValue, setClassValue] = useState("");

    const handleClass = () => {
        setClassValue(
                classRef.current.value,
            )
    };

    console.log(classValue);

    const leaderGetList = () => {
        axios
        .post("http://localhost:8005/class", {
        })
        .then((res) => {
            const { data } = res;
            setLeaderList({
                leaderList: data,
            });
            // setClassValue({
            //     classValue: classRef.current.value,
            // })
        })
        .catch((e) => {
            console.log(e);
        })
    };

    console.log('두두둥장', classValue)

    const leaders = leaderList.leaderList;

    useEffect(() => {
        leaderGetList();
    }, []);

    // console.log('밖으로 나왔냐?', classValue)
    
    return(
        <div>
            <div>
                {leaders?.map((ld) => (
                    <table key={ld.leader_name} border="1">
                    <tbody align="center">
                        <tr>
                            <td width={50}>
                                {ld.leader_name}
                            </td>
                            <td width={50}>
                                {ld.leader_hope}
                            </td>
                            <td width={50}>
                                {ld.leader_grade}
                            </td>
                            <td width={50}>
                                {ld.leader_class}
                                <input
                                type='text'
                                value={ld.leader_class}
                                ref={classRef}
                                onChange={handleClass}
                                />
                            </td>
                        </tr>
                    </tbody>
                    </table>
                ))}
            </div>
            <div>
                {/* <ClassSelect classValue={classValue} catchValue={catchValue} /> */}
            </div>
        </div>
    )
}

export default Auction;