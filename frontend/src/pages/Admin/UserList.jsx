import { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "../../redux/api/usersApiSlice";
import { toast } from "react-toastify";
// ⚠️⚠️⚠️ don't forget this ⚠️⚠️⚠️⚠️
// import AdminMenu from "./AdminMenu";

const UserList = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const [editableUserId, setEditableUserId] = useState(null);
  const [editableUserName, setEditableUserName] = useState("");
  const [editableUserEmail, setEditableUserEmail] = useState("");

  useEffect(() => {
    refetch();
  }, [refetch]);

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(id).unwrap();
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const toggleEdit = (id, username, email) => {
    setEditableUserId(id);
    setEditableUserName(username);
    setEditableUserEmail(email);
  };

  const updateHandler = async (id) => {
    try {
      await updateUser({
        userId: id,
        username: editableUserName,
        email: editableUserEmail,
      }).unwrap();
      setEditableUserId(null);
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Users</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data?.message || error.error}</Message>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {users.map((user) => (
            <div key={user._id} className="bg-white border border-gray-200 rounded-lg shadow-md p-4">
              <div className="flex flex-col space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold">{user.username}</h2>
                    <p className="text-gray-700">
                      <a href={`mailto:${user.email}`} className="text-blue-500 hover:text-blue-700">
                        {user.email}
                      </a>
                    </p>
                  </div>
                  <div>
                    {user.isAdmin ? (
                      <FaCheck style={{ color: "green" }} aria-label="Admin user" />
                    ) : (
                      <FaTimes style={{ color: "red" }} aria-label="Non-admin user" />
                    )}
                  </div>
                </div>
                {editableUserId === user._id ? (
                  <>
                    <div className="flex flex-col space-y-2">
                      <input
                        type="text"
                        value={editableUserName}
                        onChange={(e) => setEditableUserName(e.target.value)}
                        className="w-full p-2 border rounded-lg"
                      />
                      <input
                        type="text"
                        value={editableUserEmail}
                        onChange={(e) => setEditableUserEmail(e.target.value)}
                        className="w-full p-2 border rounded-lg"
                      />
                      <div className="flex space-x-2">
                        <button
                          onClick={() => updateHandler(user._id)}
                          className="bg-blue-500 text-white py-2 px-4 rounded-lg"
                          aria-label="Save changes"
                        >
                          <FaCheck />
                        </button>
                        <button
                          onClick={() => setEditableUserId(null)}
                          className="bg-gray-500 text-white py-2 px-4 rounded-lg"
                          aria-label="Cancel"
                        >
                          <FaTimes />
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => toggleEdit(user._id, user.username, user.email)}
                      className="text-blue-500 hover:text-blue-700"
                      aria-label="Edit user"
                    >
                      <FaEdit />
                    </button>
                    {!user.isAdmin && (
                      <button
                        onClick={() => deleteHandler(user._id)}
                        className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg"
                        aria-label="Delete user"
                      >
                        <FaTrash />
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserList;
