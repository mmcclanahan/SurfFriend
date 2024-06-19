export const NotificationHeader = ({
  message,
  positive,
}: {
  message: string;
  positive: boolean;
}) => {
  return (
    <div className={`notification-header-${positive}`}>
      <p>{message}</p>
    </div>
  );
};
