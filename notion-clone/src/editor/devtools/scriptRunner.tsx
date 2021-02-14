import React, { useState } from "react";


export const ScriptRunner = () => {
    const [scriptValue, setScriptValue] = useState("")


    const onSubmit  = (e :   React.FormEvent<HTMLFormElement>) => {
        console.log(e)
        e.preventDefault()
        
    }
    return (
        <form onSubmit={onSubmit} >
            <input type="text" value={scriptValue} name="script" onChange={(e) => setScriptValue(e.currentTarget.value)} style={{backgroundColor : "inherit"}}/>
        </form>
    )
}