const Footer = () => {
  return (
    <div className="grid grid-cols-1 px-2 py-4 text-sm divide-y divide-gray-400 sm:px-16 md:divide-none md:grid-cols-3">
      <div className="flex flex-wrap items-center justify-center py-2 divide-x divide-gray-400 md:col-start-2">
        <div className="px-2 cursor-pointer hover:underline">
          Privacy Policy
        </div>
        <div className="px-2 cursor-pointer hover:underline">Terms of Use</div>
        <div className="px-2 cursor-pointer hover:underline">
          Sales and Refunds
        </div>
        <div className="px-2 cursor-pointer hover:underline">Legal</div>
        <div className="px-2 cursor-pointer hover:underline">Site Map</div>
      </div>
      <a
        href="https://github.com/0xGuvnor/apple-alt-clone"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center py-2 font-mono hover:underline"
      >
        👨‍💻 Made by 0xGuvnor
      </a>
    </div>
  );
};
export default Footer;
