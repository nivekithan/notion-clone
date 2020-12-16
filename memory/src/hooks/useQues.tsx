import { useQuery } from "react-query";
// --------------------------------------------------------------------

interface SingleQues {
    type: string;
    ques: {};
    ans: {};
  }

  
interface AllQues {
    day_id: string;
    _id: string;
    data: SingleQues[][];
  }
  
  

// --------------------------------------------------------------------
export const getQues = async (day_id: string) => {
    const url = `http://localhost:4000/get/grpQue?day_id=${day_id}`;
    const data = await fetch(url);
  
    if (!data.ok) throw new Error("Something is wrong");
    return data.json();
  };
  

export const useQues = (id : string) => {

    return useQuery<AllQues, Error>(["tests", id], () => getQues(id) )

}