import { useState } from "react";
import Context from "./Context";

function Provider ({children}) {
    const [ message, setMessage ] = useState({open: false, text: ''});
    const [userName, setUserName] = useState("");
    const [data, setData] = useState([]);

    const state = {
      message, setMessage,
      userName, setUserName,
      data, setData
    }

    return(
        <Context.Provider value={ state }>
            {children}
        </Context.Provider>
    )
}

export default Provider;