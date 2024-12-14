import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UserList.css";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // Add total pages state
  const loggedInEmail = localStorage.getItem("loggedInEmail");

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const fetchUsers = async (page) => {
    try {
      const response = await axios.get(
        `https://reqres.in/api/users?page=${page}`
      );
      setUsers(response.data.data);
      setTotalPages(response.data.total_pages); // Set total pages from the response
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((user) => user.id !== id));
      alert("User deleted successfully!");
    }
  };

  const handleEdit = (id) => {
    const userToEdit = users.find((user) => user.id === id);
    if (userToEdit.email !== loggedInEmail) {
      alert("You can only edit your own data!");
      return;
    }
    const updatedFirstName = prompt(
      "Enter the new first name:",
      userToEdit.first_name
    );
    const updatedLastName = prompt(
      "Enter the new last name:",
      userToEdit.last_name
    );
    if (updatedFirstName && updatedLastName) {
      setUsers(
        users.map((user) =>
          user.id === id
            ? { ...user, first_name: updatedFirstName, last_name: updatedLastName }
            : user
        )
      );
      alert("User details updated successfully!");
    }
  };

  return (
    <div className="userlist-container">
      <h2 className="userlist-header">User List</h2>
      <div className="userlist-table-container">
        <table className="userlist-table">
          <thead>
            <tr>
              <th>Avatar</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <img
                    src={user.avatar}
                    alt={`${user.first_name} ${user.last_name}`}
                    style={{ borderRadius: "50%", width: "50px", height: "50px" }}
                  />
                </td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
                <td>
                  <div className="user-action-buttons">
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(user.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination-buttons">
          <button
            disabled={page === 1}
            onClick={() => setPage((prevPage) => prevPage - 1)}
          >
            Previous
          </button>
          <button
            disabled={page === totalPages} // Disable Next if current page is the last page
            onClick={() => setPage((prevPage) => prevPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserList;
