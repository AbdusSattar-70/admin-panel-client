import PropTypes from "prop-types";
import { FaRegTrashCan, FaLockOpen, FaLock } from "react-icons/fa6";

const UserTableActions = ({ handleBlock, handleUnblock, handleDelete }) => {
  return (
    <div className="space-x-4">
      <button
        className="btn btn-error"
        type="button"
        onClick={handleBlock}
        aria-label="Block Users"
      >
        <FaLock />
        Block
      </button>
      <button
        onClick={handleUnblock}
        className="btn btn-success"
        type="button"
        aria-label="Unblock Users"
      >
        <FaLockOpen />
        <p className="sr-only">Unblock</p>
      </button>
      <button
        onClick={handleDelete}
        className="btn btn-error"
        type="button"
        aria-label="Delete Users"
      >
        <FaRegTrashCan />
        <p className="sr-only">Delete</p>
      </button>
    </div>
  );
};

UserTableActions.propTypes = {
  handleBlock: PropTypes.func.isRequired,
  handleUnblock: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default UserTableActions;
