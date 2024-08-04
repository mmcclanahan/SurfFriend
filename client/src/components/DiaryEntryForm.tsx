export const DiaryEntryForm = ({ setDiary, closeDiaryModal, addSession }) => {
  //one text input for diary
  //one for surfed with
  return (
    <form className="">
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
      <button onClick={closeDiaryModal}>Cancel</button>
      <button onClick={addSession}>Save Session</button>
    </form>
  );
};
