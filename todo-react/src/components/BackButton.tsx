import { useNavigate } from "react-router-dom";

export const BackBtn = ({ dark }: { dark?: boolean }) => {
  const navigate = useNavigate();
  return (
    <button
      className={`${
        dark ? "text-white" : ""
      } absolute top-2 left-4 hover:underline`}
      onClick={() => navigate("/")}
    >
      <span className="flex items-center justify-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          />
        </svg>
        <span>back</span>
      </span>
    </button>
  );
};
