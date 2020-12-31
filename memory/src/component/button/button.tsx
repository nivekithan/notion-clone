
export type ButtonProps = {
  label: String;
};

export const Button = ({ label }: ButtonProps) => {
  return <button>{label}</button>;
};
