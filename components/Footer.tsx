const Footer = () => {
  return (
    <div className="grid grid-cols-1 px-2 py-4 text-sm sm:px-16 lg:divide-none lg:grid-cols-3">
      <div className="flex flex-wrap items-center justify-center py-2 divide-x divide-gray-400 lg:col-span-2 xl:col-span-1 xl:col-start-2">
        <div className="footerLink">Privacy Policy</div>
        <div className="footerLink">Terms of Use</div>
        <div className="footerLink">Sales and Refunds</div>
        <div className="footerLink">Legal</div>
        <div className="footerLink">Site Map</div>
      </div>
      <a
        href="https://github.com/0xGuvnor/apple-alt-clone"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center py-2 font-mono hover:underline lg:col-start-3"
      >
        👨‍💻 Made by 0xGuvnor
      </a>
    </div>
  );
};
export default Footer;
