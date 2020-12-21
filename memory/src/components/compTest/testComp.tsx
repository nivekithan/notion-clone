import { RouteComponentProps } from "react-router-dom";
import {useQues} from "../../hooks";
import {DoubleLinked} from "../../api/doubleLinked"
// =====================================================
interface MatchParams {
  id: string;
}

interface TestComponentTypes extends RouteComponentProps<MatchParams> {}



type Page =  {
  start : string | null,
  end : string | null,
  data : DoubleLinked<Ques>
}

interface Ques {
  start : string | null,
  end : string | null,
  data : {
    type : string,
    ques : {},
    ans : {}
  } | {}
}


// --------------------------------------------------------
export const TestComponent = ({ match }: TestComponentTypes) => {
  const allQuesQuery = useQues(match.params.id);

  if (allQuesQuery.isLoading) return <h1>Fetching .....</h1>;

  if (allQuesQuery.isError)
    return <h1>THere is some error {allQuesQuery.error.message}</h1>;

  if (allQuesQuery.isSuccess) {
  const { data } = allQuesQuery;
  
    const AllPage = new DoubleLinked<Page>(data.data)
    
    console.log(AllPage)
  

  return (
    <h1>Something</h1>
  )
  }

  return <h1>Something is wrong</h1>
};
