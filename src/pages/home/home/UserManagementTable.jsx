import { useState, useEffect } from "react";
import axios from "axios";

const UserManagementTable = () => {
  const baseUrl = "http://localhost:3000";
  const [users, setUsers] = useState([]);
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user data when the component mounts
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/admin/users`);
        setUsers(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleCheckboxChange = (userId) => {
    // Toggle the selected state of the user
    setSelectedUserIds((prevSelectedUserIds) => {
      if (prevSelectedUserIds.includes(userId)) {
        return prevSelectedUserIds.filter((id) => id !== userId);
      } else {
        return [...prevSelectedUserIds, userId];
      }
    });
  };

  
  const handleBlockUsers = async () => {
    try {
      await axios.patch(`${baseUrl}/api/admin/blocks`, {
        userIds: selectedUserIds,
      }); 
    } catch (error) {
      console.error("Error blocking users:", error);
    }
  };

  const handleBlockUser = async (id) => {
    // Send a request to block selected user
    try {
      await axios.patch(`${baseUrl}/api/admin/block/${id}`, {
        userIds: selectedUserIds,
      }); 
    } catch (error) {
      console.error("Error blocking user:", error);
    }
  };

  return (
    <div>
      <h2>User Management</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={selectedUserIds.length === users.length}
                  onChange={() =>
                    setSelectedUserIds(
                      selectedUserIds.length === users.length
                        ? []
                        : users.map((user) => user.id)
                    )
                  }
                />
              </th>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Last Login Time</th>
              <th>Registration Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedUserIds.includes(user.id)}
                    onChange={() => handleCheckboxChange(user.id)}
                  />
                </td>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.lastLoginTime}</td>
                <td>{user.registrationTime}</td>
                <td>{user.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div>
        <button onClick={handleBlockUsers}>Block Selected Users</button>
        {/* Similar buttons for unblocking and deleting users */}
      </div>
    </div>
  );
};

export default UserManagementTable;
