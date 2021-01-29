import React from "react";

export type AppProps = {
  label: string;
};

export function App({ label }: AppProps) {
  return <div className="text-blue-50">{label}</div>;
}
