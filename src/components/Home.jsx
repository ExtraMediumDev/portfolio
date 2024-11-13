const Home = ({ scrollContainer }) => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center px-16 bg-gray-900">
      <h1 
        className="text-8xl font-bold text-transparent bg-clip-text gradient-text animate-gradient-text transition-transform duration-300 hover:scale-105">
        Hey, I'm Brian.
      </h1>
      <p className="mt-4 text-xl text-center">
        <span className="text-white">I study Computer Science at </span> <span className="text-blue-500">University of Illinois</span> <span className="text-orange-500">Urbana-Champaign</span>.
      </p>
    </div>
  );
};

export default Home;
