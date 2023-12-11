import { Link } from "react-router-dom";
import Users from "./Users";

const Admin = () => {
  return (
    <section className="flex flex-col gap-3 max-w-6xl mx-auto p-4 sm:p-8 md:p-10">
      <Users />
      <Link className="btn btn-secondary" to="/">
        Go to Home
      </Link>
    </section>
  );
};

export default Admin;
