import PropTypes from "prop-types";
import UserTableRow from "./UserTableRow";
import UserTableHeader from "./UserTableHeader";

const UserTable = ({
  users,
  selectedUsers,
  handleCheckboxChange,
  ALL_USER_ID,
  selectAll,
}) => {
  console.log("calling from table");

  return (
    <table className="w-full text-sm text-left rtl:text-right text-blue-100 dark:text-blue-100">
      <UserTableHeader
        selectAll={selectAll}
        ALL_USER_ID={ALL_USER_ID}
        handleCheckboxChange={handleCheckboxChange}
      />
      <tbody>
        {users.map(
          ({ _id, name, email, lastLoginTime, registrationTime, status }) => (
            <UserTableRow
              key={String(_id)}
              id={_id}
              name={name}
              email={email}
              registrationTime={registrationTime}
              lastLoginTime={lastLoginTime}
              status={status}
              selectedUsers={selectedUsers}
              handleCheckboxChange={handleCheckboxChange}
            />
          )
        )}
      </tbody>
    </table>
  );
};

UserTable.propTypes = {
  users: PropTypes.array.isRequired,
  selectedUsers: PropTypes.array.isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
  ALL_USER_ID: PropTypes.string.isRequired,
  selectAll: PropTypes.bool.isRequired,
};

export default UserTable;
