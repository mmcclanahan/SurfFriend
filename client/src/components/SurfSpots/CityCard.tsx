interface CityCardProps {
  city: string;
  spots: number;
  selectCity: (city: string) => void;
}

export const CityCard = ({ city, spots, selectCity }: CityCardProps) => {
  return (
    <div className="city-card" onClick={() => selectCity(city)}>
      <h4>{city}</h4>
      <p>Surf Spots: {spots}</p>
    </div>
  );
};
