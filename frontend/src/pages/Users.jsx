import Swal from "sweetalert2";
import usersBG from "../assets/usersBG.webp"
import toast from "react-hot-toast";

import {
  useEffect,
  useState,
} from "react";

import API from "../services/api";

import Sidebar from "../components/Sidebar";

function Users() {

  const [users, setUsers] =
    useState([]);

  // FORM STATES

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [role, setRole] =
    useState("staff");

  // FETCH USERS

  const fetchUsers = async () => {

    try {

      const response =
        await API.get(
          "/auth/users"
        );

      setUsers(response.data);

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to fetch users"
      );
    }
  };

  useEffect(() => {

    fetchUsers();

  }, []);

  // CREATE USER

  const createUser = async () => {

    try {

      // VALIDATION

      if (
        !username ||
        !password
      ) {

        toast.error(
          "Please fill all fields"
        );

        return;
      }

      // PASSWORD VALIDATION

      if (password.length < 6) {

        toast.error(
          "Password must be at least 6 characters"
        );

        return;
      }

      // API CALL

      await API.post(
        "/auth/register",
        {
          username,
          password,
          role,
        }
      );

      toast.success(
        "User created successfully"
      );

      // RESET

      setUsername("");

      setPassword("");

      setRole("staff");

      fetchUsers();

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to create user"
      );
    }
  };

  // DELETE USER

  const deleteUser = async (id) => {

    // CURRENT USER

    const currentUser =
      JSON.parse(
        localStorage.getItem("user")
      );

    // PREVENT SELF DELETE

    if (currentUser.id === id) {

      toast.error(
        "You cannot delete your own account"
      );

      return;
    }

    // CONFIRM

    const result =
  await Swal.fire({
    title: "Delete User?",
    text:
      "This action cannot be undone",
    icon: "warning",
    width: "350px",
    showCancelButton: true,
    confirmButtonText:
      "Delete",
    cancelButtonText:
      "Cancel",
  });

if (!result.isConfirmed) {
  return;
}

    try {

      await API.delete(
        `/auth/users/${id}`
      );

      toast.success(
        "User deleted successfully"
      );

      fetchUsers();

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to delete user"
      );
    }
  };

  return (

    <div className="flex">

      {/* SIDEBAR */}

      <Sidebar />

      {/* MAIN */}

      <div
  className="

    relative

    w-full

    p-6

    md:ml-64

    min-h-screen

    overflow-hidden

    bg-cover
    bg-center
    bg-no-repeat
  "

  style={{
    backgroundImage: `
      linear-gradient(
        rgba(240,244,255,0.92),
        rgba(232,240,255,0.92)
      ),
      url(${usersBG})
    `,
  }}
>
  {/* BACKGROUND EFFECTS */}

<div className="
  absolute
  top-10
  right-10

  w-72
  h-72

  bg-blue-300/20

  rounded-full

  blur-3xl

  pointer-events-none
"/>

<div className="
  absolute
  bottom-10
  left-10

  w-72
  h-72

  bg-purple-300/20

  rounded-full

  blur-3xl

  pointer-events-none
"/>

        {/* TITLE */}

       <h1
  className="
    text-3xl
    font-bold
    mb-4
  "
>
  User Management
</h1>

        {/* CREATE USER */}

        <div className="
  bg-white
  p-4
  rounded-2xl
  border
  shadow-sm
  mb-5
">

          <h2 className="
            text-xl
            font-bold
            mb-4
          ">
            Create User
          </h2>

          <div className="
            grid
            grid-cols-1
            md:grid-cols-4
            gap-3
          ">

            {/* USERNAME */}

            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) =>
                setUsername(
                  e.target.value
                )
              }
              className="
  h-10
  bg-white
  border
  border-gray-200
  rounded-xl
  px-3
  text-sm
  shadow-sm
  outline-none
  focus:ring-2
  focus:ring-blue-400
"
            />

            {/* PASSWORD */}

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
             className="
  h-10
  bg-white
  border
  border-gray-200
  rounded-xl
  px-3
  text-sm
  shadow-sm
  outline-none
  focus:ring-2
  focus:ring-blue-400
"
            />

            {/* ROLE */}

            <select
              value={role}
              onChange={(e) =>
                setRole(
                  e.target.value
                )
              }
              className="
  h-10
  bg-white
  border
  border-gray-200
  rounded-xl
  px-3
  text-sm
  shadow-sm
  outline-none
  focus:ring-2
  focus:ring-blue-400
"
            >

              <option value="staff">
                Staff
              </option>

              <option value="admin">
                Admin
              </option>

            </select>

            {/* BUTTON */}

            <button
              onClick={createUser}
             className="
  h-10
  bg-blue-600
  text-white
  px-5
  rounded-xl
  text-sm
  shadow-sm
  hover:bg-blue-700
  transition-all
"
            >
              Create User
            </button>

          </div>

        </div>

        {/* USER TABLE */}

        <div className="
  bg-white
  rounded-2xl
  border
  shadow-sm
  overflow-x-auto
">

          <table className="
            w-full
            border-collapse
          ">

            {/* HEADER */}

            <thead className="
  bg-gray-50
">

              <tr>

                <th className="
                  p-3
                  text-left
                ">
                  ID
                </th>

                <th className="
                  p-3
                  text-left
                ">
                  Username
                </th>

                <th className="
                  p-3
                  text-left
                ">
                  Role
                </th>

                <th className="
                  p-3
                  text-left
                ">
                  Action
                </th>

              </tr>

            </thead>

            {/* BODY */}

            <tbody>

              {users.map((user) => (

                <tr
  key={user.id}
  className="
    border-b
    hover:bg-gray-50
    transition
  "
>

                  {/* ID */}

                  <td className="p-3">
                    {user.id}
                  </td>

                  {/* USERNAME */}

                  <td className="p-3">
                    {user.username}
                  </td>

                  {/* ROLE */}

                  <td className="p-3">

                    <span className={`
                      px-2
                      py-1
                      rounded-full
                      text-xs
                      font-medium

                      ${
                        user.role === "admin"

                        ? "bg-red-100 text-red-700"

                        : "bg-blue-100 text-blue-700"
                      }
                    `}>

                      {user.role}

                    </span>

                  </td>

                  {/* ACTIONS */}

                  <td className="
                    p-3
                    flex
                    gap-2
                    flex-wrap
                  ">

                    {/* CHANGE PASSWORD */}

                    <button
                      onClick={async () => {

                        const { value: newPassword } =
  await Swal.fire({
    title: "Change Password",
    input: "password",
    inputLabel: "Enter New Password",
    inputPlaceholder: "New Password",
    width: "350px",
    showCancelButton: true,
    confirmButtonText: "Update",
    cancelButtonText: "Cancel",
  });

if (!newPassword) return;

if (newPassword.length < 6) {

  toast.error(
    "Password must be at least 6 characters"
  );

  return;
}

try {

  await API.put(

    `/auth/users/${user.id}/password`,

    {
      password: newPassword,
    }
  );

  await Swal.fire({
    icon: "success",
    title: "Password Updated",
    text:
      "Password updated successfully",
      width: "350px",
      
  });

} catch (error) {

  console.log(error);

  toast.error(
    "Failed to update password"
  );
}
                      }}

                      className="
  bg-yellow-500
  text-white
  px-3
  py-1.5
  rounded-xl
  text-sm
  shadow-sm
  hover:bg-yellow-600
  transition-all
"
                    >
                      Password
                    </button>

                    {/* CHANGE ROLE */}

                    <button
                      onClick={async () => {

                        const { value: newRole } =
  await Swal.fire({
    title: "Change Role",

    input: "select",

    inputOptions: {
      admin: "Admin",
      staff: "Staff",
    },
    width: "350px",

    inputPlaceholder:
      "Select Role",

    showCancelButton: true,

    confirmButtonText:
      "Update",

    cancelButtonText:
      "Cancel",
  });

if (!newRole) return;

try {

  await API.put(

    `/auth/users/${user.id}/role`,

    {
      role: newRole,
    }
  );

  await Swal.fire({
    icon: "success",
    title: "Role Updated",
    text:
      "Role updated successfully",
  });

  fetchUsers();

} catch (error) {

  console.log(error);

  toast.error(
    "Failed to update role"
  );
}
                      }}

                      className="
  bg-indigo-600
  text-white
  px-3
  py-1.5
  rounded-xl
  text-sm
  shadow-sm
  hover:bg-indigo-700
  transition-all
"
                    >
                      Role
                    </button>

                    {/* DELETE */}

                    <button
                      onClick={() =>
                        deleteUser(
                          user.id
                        )
                      }
                      className="
  bg-red-600
  text-white
  px-3
  py-1.5
  rounded-xl
  text-sm
  shadow-sm
  hover:bg-red-700
  transition-all
"
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Users;