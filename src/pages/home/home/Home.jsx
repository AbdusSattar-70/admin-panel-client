import UserManagementTable from "./UserManagementTable";

const Home = () => {
  return (
    <div>
      {/* top */}
      <div className="flex flex-col gap-6 max-w-6xl mx-auto p-4 sm:p-8 md:p-10">
        <h1 className="text-slate-700 font-bold text-3xl sm:text-6xl">
          Find your next <span className="text-slate-500">perfect</span>
          <br />
          place to store your images!
        </h1>
        <div className="text-gray-400 text-xs sm:text-sm">
          Turn ideas into outstanding designs with high-quality vectors, photos,
          videos, mockups, and more
          <br />
          We have a wide range of properties for you to choose from.
        </div>
      </div>

      <div>
        <UserManagementTable />
      </div>
    </div>
  );
};

export default Home;
