interface CityCardProps {
  city: string;
  spots: number;
  selectCity: (city: string) => void;
}

export const CityCard = ({ city, spots, selectCity }: CityCardProps) => {
  return (
    <div
      className="flex flex-col items-center border rounded shadow-md bg-myGray p-5 cursor-pointer"
      onClick={() => selectCity(city)}
    >
      <h4 className="font-semibold">{city}</h4>
      <p>Surf Spots: {spots}</p>
    </div>
  );
};
