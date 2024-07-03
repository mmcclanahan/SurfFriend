interface CityCardProps {
  city: string;
  spots: number;
  selectCity: (city: string) => void;
}

export const CityCard = ({ city, spots, selectCity }: CityCardProps) => {
  return (
    <div
      className="border rounded shadow-md bg-myGray p-5"
      onClick={() => selectCity(city)}
    >
      <h4>{city}</h4>
      <p>Surf Spots: {spots}</p>
    </div>
  );
};
