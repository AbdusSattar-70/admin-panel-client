import PropTypes from "prop-types";

const UserTableCheckbox = ({ id, selectedUsers, handleCheckboxChange }) => {
  console.log("calling from checkbox");

  return (
    <td className="w-4 p-4">
      <div className="flex items-center">
        <input
          onChange={() => handleCheckboxChange(String(id))}
          checked={selectedUsers.includes(String(id))}
          id={`checkbox-table-search-${String(id)}`}
          type="checkbox"
          className="w-4 h-4 cursor-pointer text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label
          htmlFor={`checkbox-table-search-${String(id)}`}
          className="sr-only"
        >
          checkbox
        </label>
      </div>
    </td>
  );
};

UserTableCheckbox.propTypes = {
  id: PropTypes.string.isRequired,
  selectedUsers: PropTypes.array.isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
};

export default UserTableCheckbox;
