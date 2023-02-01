import { useState } from "react";
import Context from "./Context";

function Provider ({children}) {
    const [ message, setMessage ] = useState({open: false, text: ''});

    const state = {
      message, setMessage
    }

    return(
        <Context.Provider value={ state }>
            {children}
        </Context.Provider>
    )
}

export default Provider;