import { Avatar } from "../lib/getAvatars";
import AvatarImage from "./AvatarImage";

interface ModalProps {
  avatar: Avatar | null;
  onClose: () => void;
}

const Modal = ({ avatar, onClose }: ModalProps) => {
  if (!avatar) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-zinc-800 rounded-lg shadow-lg p-8 max-w-4xl w-full flex relative border-solid border-1 border-zinc-700"
        onClick={(e) => e.stopPropagation()}
      >
        <AvatarImage avatar={avatar} />
        <div className="w-1/2 p-4">
          <h2 className="text-2xl font-bold mb-4 text-white">{avatar.name}</h2>
          <ul className="space-y-2">
            {avatar.attributes.map((attr, index) => {
              return (
                <li key={index} className="flex items-center justify-between">
                  <span className="text-white">
                    {attr.trait_type}: {attr.value}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Modal;

