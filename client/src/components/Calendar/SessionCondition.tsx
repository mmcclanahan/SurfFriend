export const SessionCondition = ({
  conditions,
  diary,
}: {
  conditions: string;
  diary: string;
}) => {
  return (
    <div>
      <h1>SessionCondition</h1>
      <p>session conditions listed here</p>
      <h3>Diary Entry</h3>
      <p>{diary}</p>
    </div>
  );
};
