import { useEffect, useState } from "react"


export const TestComponent  = (props : any) => {
    
    const [dayId, setDayId] = useState<string>("")

    useEffect(() => {
        console.log(props.match.params.id)
    }, [])

    return <h1>I am here</h1>
}