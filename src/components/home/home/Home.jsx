import HomeDecorator from "./HomeDecorator";

const Home = () => {
  return (
    <section>
      <div className="flex flex-col gap-6 max-w-6xl mx-auto p-4 sm:p-8 md:p-10">
        <h1 className="text-slate-700 font-bold text-3xl sm:text-6xl">
          Find your next <span className="text-slate-500">perfect</span>
          <br />
          place to store your Data!
        </h1>
        <HomeDecorator />
      </div>
    </section>
  );
};

export default Home;
