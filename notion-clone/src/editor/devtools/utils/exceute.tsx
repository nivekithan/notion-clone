/*
      The function will exceute the javascript code given in script parmeter in global context. 

      The parameters can be accessed from the script with the object '_'

    */

import { ReactEditor } from "slate-react";

export const exceute = (
  parameters: { [index: string]: unknown },
  editor : ReactEditor,
  script: string
) => {
  const scriptFunction = Function(`return (_, editor) => { return  (${script})}`)();

  return scriptFunction(parameters, editor);
};
