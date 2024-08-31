import { useState } from "react";
import { createSession } from "../Supa/queries/sessionsQuery";
import { useNotification } from "../hooks/NotificationContext";

export const DiaryEntryForm = ({
  closeDiaryModal,
  city,
  spotName,
  rating,
}: {
  closeDiaryModal: () => void;
  city: string;
  spotName: string;
  rating: number;
}) => {
  const { showNotification } = useNotification();
  const [diary, setDiary] = useState("");

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const session = {
      city: city,
      spot_name: spotName,
      rating: rating,
      diary: diary,
    };

    const { data, error } = await createSession(session);
    if (error) {
      showNotification("Error saving your session!", 0);
      return;
    } else {
      showNotification("Session saved!", 1);
    }
    closeDiaryModal();
  };

  return (
    <form onSubmit={onSubmit}>
      <label
        htmlFor="message"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Diary Entry
      </label>
      <textarea
        id="message"
        rows={4}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Write about you're session here..."
        onChange={(e) => setDiary(e.target.value)}
      ></textarea>
      <button type="button" onClick={closeDiaryModal}>
        Cancel
      </button>
      <button type="submit">Save Session</button>
    </form>
  );
};
