interface ToggleButtonProps {
  active: boolean;
  onClick: () => void;
  label: string;
}

export const ToggleButton = ({ active, onClick, label }: ToggleButtonProps) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded ${
      active ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
    }`}
  >
    {label}
  </button>
);
