interface Props {
  title: string;
  onClick?: () => void;
  width?: string;
  loading?: boolean;
  padding?: string;
  noIcon?: boolean;
}

const Button = ({ title, onClick, width, loading, padding, noIcon }: Props) => {
  return (
    <button
      disabled={loading}
      onClick={onClick}
      className={`relative inline-flex items-center justify-center ${padding} px-5 py-2 ${
        width ? width : "w-auto"
      } overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded shadow-xl group`}
    >
      <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-pink-500 via-purple-500 to-sky-500"></span>
      <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-30 group-hover:rotate-90 ease"></span>
      <span className="relative text-white">
        <span className="relative z-20 flex items-center font-semibold">
          {noIcon && (
            <svg
              className="relative flex-shrink-0 w-5 h-5 mr-2 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              ></path>
            </svg>
          )}
          {loading ? "Loading..." : title}
        </span>
      </span>
    </button>
  );
};
export default Button;
