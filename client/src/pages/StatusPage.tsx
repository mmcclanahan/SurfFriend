import { useState, useEffect } from "react";
import { Loading } from "../components/Loading";
import { StatusForm } from "../types/types";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getStatus, updateStatus } from "../API/status";
import "../styles/statusPage.css";

export const StatusPage = ({ userId }: { userId: number }) => {
  const [status, setStatus] = useState(1);
  const [location, setLocation] = useState("");
  const [rating, setRating] = useState(1);

  const queryClient = useQueryClient();
  const statusQuery = useQuery({
    queryKey: ["status"],
    queryFn: () => getStatus(userId),
  });

  const updateStatusMutation = useMutation({
    mutationFn: (statusForm: StatusForm) => updateStatus(userId, statusForm),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["status"] });
    },
  });

  useEffect(() => {
    if (statusQuery.data) {
      setStatus(statusQuery.data.status);
      setLocation(statusQuery.data.location);
      setRating(statusQuery.data.rating);
    }
  }, [statusQuery.data]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const statusForm: StatusForm = {
      status,
      location,
      rating,
    };
    updateStatusMutation.mutate(statusForm);
  };

  if (statusQuery.isLoading) return <Loading />;

  return (
    <div className="statusPage">
      <h1>Update Status</h1>
      <form className="statusForm" onSubmit={handleSubmit}>
        <div className="formDivs">
          <label htmlFor="status" className="formLabels">
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => {
              setStatus(Number(e.target.value));
            }}
          >
            <option value={1}>Not Surfing</option>
            <option value={2}>Checking the spot</option>
            <option value={3}>Jumping in water</option>
            <option value={4}>Done Surfing</option>
          </select>
        </div>
        <div className="formDivs">
          <label htmlFor="location" className="formLabels">
            Surf Spot
          </label>
          <input
            id="location"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
            }}
            disabled={status === 1}
          />
        </div>
        <div className="formDivs">
          <label htmlFor="rating" className="formLabels">
            Rating
          </label>
          <div className="btnDivs">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                className={
                  statusQuery.data.rating === value ? "selectedBtn" : ""
                }
                onClick={() => {
                  setRating(value);
                }}
                disabled={status !== 4}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
