import PropTypes from "prop-types";

const UserTableHeader = ({ handleCheckboxChange, ALL_USER_ID, selectAll }) => {
  console.log("calling from header");

  return (
    <thead className="text-xs text-white uppercase bg-blue-600 border-b border-blue-400 dark:text-white">
      <tr>
        <th scope="col" className="p-4">
          <div className="flex items-center">
            <label htmlFor="checkbox-all-search" className="sr-only">
              checkbox
            </label>
            <input
              id="checkbox-all-search"
              onChange={() => handleCheckboxChange(ALL_USER_ID)}
              checked={selectAll}
              type="checkbox"
              className="w-4 h-4 cursor-pointer text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
        </th>
        <th scope="col" className="px-6 py-3">
          ID
        </th>
        <th scope="col" className="px-6 py-3">
          Name
        </th>
        <th scope="col" className="px-6 py-3">
          Email
        </th>
        <th scope="col" className="px-6 py-3">
          Registration Time
        </th>
        <th scope="col" className="px-6 py-3">
          Last Login Time
        </th>
        <th scope="col" className="px-6 py-3">
          Status
        </th>
      </tr>
    </thead>
  );
};

UserTableHeader.propTypes = {
  handleCheckboxChange: PropTypes.func.isRequired,
  ALL_USER_ID: PropTypes.string.isRequired,
  selectAll: PropTypes.bool.isRequired,
};

export default UserTableHeader;
