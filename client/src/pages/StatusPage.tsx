import { useState, useEffect } from "react";
import { Loading } from "../components/Loading";
import { StatusForm, Session } from "../types/types";
import { useUserStatus } from "../hooks/useUserStatus";
import { createSession } from "../API/sessions";
import { useNavigate, useOutletContext } from "react-router-dom";
import "../styles/statusPage.css";

export const StatusPage = ({ userId = 1 }: { userId: number }) => {
  const navigate = useNavigate();
  const [status, setStatus] = useState(1);
  const [location, setLocation] = useState("");
  const [rating, setRating] = useState(3);
  const { setNotification } = useOutletContext<{
    setNotification: (notification: {
      message: string;
      positive: boolean;
    }) => void;
  }>();

  const { statusQuery, updateStatusMutation } = useUserStatus(userId);

  useEffect(() => {
    if (statusQuery.data) {
      setStatus(statusQuery.data.status);
      setLocation(statusQuery.data.location);
      setRating(statusQuery.data.rating);
    }
  }, [statusQuery.data]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const statusForm: StatusForm = {
      status,
      location,
      rating,
    };
    updateStatusMutation.mutate(statusForm);
    if (status === 4) {
      const session: Session = {
        location,
        rating,
      };
      createSession(userId, session);
    }
    navigate("/");
    setNotification({
      message: "Status updated",
      positive: true,
    });
  };

  const handleStatusChange = (status: number) => {
    setStatus(status);
    if (status === 1) {
      setLocation("");
    }
    if (status < 4 && rating !== 0) {
      setRating(0);
    }
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
              handleStatusChange(Number(e.target.value));
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
