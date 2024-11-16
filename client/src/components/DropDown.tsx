interface TextAndFunctionObject {
  [text: string]: () => void;
}

export const DropDown = ({
  dropdownRef,
  textAndFunctionObject,
}: {
  dropdownRef: React.RefObject<HTMLDivElement>;
  textAndFunctionObject: TextAndFunctionObject;
}) => {
  return (
    <div ref={dropdownRef}>
      {Object.entries(textAndFunctionObject).map(([text, action]) => (
        <div key={text} onClick={() => action()}>
          {text}
        </div>
      ))}
    </div>
  );
};
