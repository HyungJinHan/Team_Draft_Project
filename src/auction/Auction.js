import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRef } from "react";
import ClassSelect from "./ClassSelect";

const Auction = () => {
    
    // sconst ssName = window.sessionStorage.getItem("name");
    const [AAA, setAAA] = useState("")
    const [leaderList, setLeaderList] = useState([]);
    // const [className, setClassName] = useState("");

    // const classGetList = () => {
    //     axios
    //     .post("http://localhost:8005/class", {
    //         leader_name: ssName,
    //     })
    //     .then((res) => {
    //         const { data } = res;
    //         setClassName({
    //             className: data,
    //         });
    //     })
    //     .catch((e) => {
    //         console.log(e);
    //     })

    // }

    // const myClassName = className.className;
    // console.log("classNAme=>", myClassName);
    

    const leaderGetList = () => {
        axios
        .post("http://localhost:8005/auction", {
            leader_class: AAA,
        })
        .then((res) => {
            const { data } = res;
            setLeaderList({
                leaderList: data,
            });
        })
        .catch((e) => {
            console.log(e);
        })
    };

    const leaders = leaderList.leaderList;

    useEffect(() => {
        leaderGetList();
    }, []);

    console.log("classNAme2=>", leaders);

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
                            </td>
                        </tr>
                    </tbody>
                    </table>
                ))}
            </div>
            <div>
                {/* <ClassSelect setAAA={setAAA} /> */}
            </div>
        </div>
    )
}

export default Auction;

