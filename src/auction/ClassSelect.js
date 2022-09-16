import React, {useRef} from "react";

const ClassSelect = ({setAAA}) =>{
    const jsaRef = useRef();
    const jsbRef = useRef();
    const pyaRef = useRef();
    const pybRef = useRef();

    const onClick = (e) => {
        setAAA(e.target.value);
        console.log(e.target.value);
    }
    return(
        <div>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <button name="classBtn" value="JSA" ref={jsaRef} onClick={onClick}>JS_A</button>
                        </td>
                        <td>
                          <button name="classBtn" value="JSB" ref={jsbRef} onClick={onClick}>JS_B</button>
                        </td>
                        <td>
                            <button name="classBtn" value="PythonA" ref={pyaRef} onClick={onClick}>Python_A</button>
                        </td>
                        <td>
                            <button name="classBtn" value="PythonB" ref={pybRef} onClick={onClick}>Python_B</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default ClassSelect;