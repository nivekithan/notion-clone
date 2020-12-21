import { useQuery } from "react-query";
// --------------------------------------------------------------------

interface SinglePage {
  [index: string]: { _next: string | null; _prev: string | null; data: AllQues };
}

interface AllPage {
  start: string | null ;
  end: string | null;
  dataField: SinglePage;
}

interface AllQues {
  start: string | null;
  end: string | null;
  data: SingleQues;
}

interface SingleQues {
  [index: string]: {
    _next: string;
    _prev: string;
    data: {
      type: string;
      ques: {};
      ans: {};
    };
  };
}

interface AllData {
  day_id: string;
  _id: string;
  data: AllPage;
}

// --------------------------------------------------------------------
export const getQues = async (day_id: string) => {
  const url = `http://localhost:4000/get/grpQue?day_id=${day_id}`;
  const data = await fetch(url);

  if (!data.ok) throw new Error("Something is wrong");
  return data.json();
};

export const useQues = (id: string) => {
  return useQuery<AllData, Error>(["tests", id], () => getQues(id));
};
