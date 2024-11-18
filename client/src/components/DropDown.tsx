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
    <div
      ref={dropdownRef}
      className="z-50 absolute bottom-0 right-0 translate-y-full bg-white border border-gray-300 rounded shadow-lg p-2"
    >
      {Object.entries(textAndFunctionObject).map(([text, action]) => (
        <div className="w-max" key={text} onClick={() => action()}>
          {text}
        </div>
      ))}
    </div>
  );
};
