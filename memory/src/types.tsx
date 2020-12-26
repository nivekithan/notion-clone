import { Node } from "slate";



export interface TestDB {
  start: string | null;
  end: string | null;
  data: {
    [index: string]: {
      _next: string | null;
      _prev: string | null;
      data: {
        start: string | null;
        end: string | null;
        data:
          | {
              [index: string]: {
                _next: string | null;
                _prev: string | null;
                data: {
                  type: string;
                  ques: {children : Node[]};
                  ans: {children : Node[]};
                };
              };
            }
          | {};
      };
    };
  };
}

export type ButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
