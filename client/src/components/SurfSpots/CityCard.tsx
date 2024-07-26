import { CityCardProps } from "../../types/types";

export const CityCard = ({
  city,
  spots,
  selectCity,
  selectedCity,
}: CityCardProps) => {
  //if its the current city the city card will be #1A4F5C
  return (
    <div
      className={`flex flex-col justify-center items-center rounded-3xl p-5 cursor-pointer w-full border ${
        selectedCity === city
          ? "border-[#FFE8A3]"
          : "bg-[#D86B6B] hover:bg-[#1A4F5C]"
      }`}
      onClick={() => selectCity(city)}
    >
      <h4 className="font-semibold text-[#FFE8A3]">{city}</h4>
      <p className="text-[#FFE8A3]">Surf Spots: {spots}</p>
    </div>
  );
};
