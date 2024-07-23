import { ConfirmProps } from "../types/types";

export const Confirm = ({ header, confirmFn, backFn, info }: ConfirmProps) => {
  return (
    <div>
      <h2 className="font-bold">{header}</h2>
      {info.map((text) => (
        <p key={text}>{text}</p>
      ))}
      <button onClick={backFn}>Cancel</button>
      <button onClick={confirmFn}>Delete</button>
    </div>
  );
};
