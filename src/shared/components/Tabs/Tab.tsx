type Props = {
  name: string;
  active: boolean;
  onClick: () => void;
  isAdd?: boolean;
};

export const Tab = ({ name, active, onClick, isAdd = false }: Props) => {
  return (
    <button
      onClick={onClick}
      title={isAdd ? "New folder" : name}
      className={`${
        isAdd
          ? "bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white min-w-10 px-3"
          : active
            ? "bg-gray-800 text-white min-w-10 sm:min-w-30"
            : "bg-gray-900 text-gray-400 hover:text-gray-200 min-w-10 sm:min-w-30"
      } h-10 max-w-40 truncate px-4 border-l border-r border-t border-gray-600 rounded-t-lg transition-colors duration-150 cursor-pointer`}
    >
      {name}
    </button>
  );
};
