
import { useMutation, useQueryClient } from "react-query";
import {DayJSON, SingleDay} from "./useDays"


// -------------------------------------------------------------------------
const deleteDays = async({id}: {id : string}) => {

    console.log(id)

    const url = `http://localhost:4000/delete/days?id=${id}`

    const res = await fetch(url, {
        method: "DELETE"
    })

    if (!res.ok) throw new Error("Something is wrong")

    const dataJSON : Promise<DayJSON> = res.json()

    return (await dataJSON).days

}

export const useDeleteDays = () => {

    const queryClient = useQueryClient()

    return useMutation<SingleDay[], Error, {id : string, stateFunc? : () => void}>((d) => deleteDays(d), {
        onMutate: ({stateFunc}) => {
            if (stateFunc) {
                stateFunc()
            }
        },

        onSuccess: (d) => {
            queryClient.setQueryData(["days"], d)
        }
    })
}