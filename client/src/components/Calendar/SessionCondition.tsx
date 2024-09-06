export const SessionCondition = ({
  conditions,
}: {
  conditions: string;
  diary: string | undefined;
}) => {
  return (
    <div>
      <h3 className="text-sm mt-2 text-[#FFCD29]">Conditions</h3>
      <p className="p-1 text-[#FFE8A3]">{conditions}</p>
    </div>
  );
};
