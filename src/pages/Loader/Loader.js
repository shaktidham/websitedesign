import Logo from "./../../img/logo.png";

const Loader = () => {
  return (
    <div className="flex flex-col bg-gray-200 items-center justify-center w-full h-screen p-4">
      <img 
        src={Logo} 
        alt="Logo" 
        className="h-16 w-auto max-w-full mb-4" 
      />
      <p className="text-gray-700 text-xl md:text-2xl font-bold animate-pulse text-center">
        Please wait...
      </p>
    </div>
  );
};

export default Loader;
