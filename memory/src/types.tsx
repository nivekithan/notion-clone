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
                  ques: {};
                  ans: {};
                };
              };
            }
          | {};
      };
    };
  };
}

export type ButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
