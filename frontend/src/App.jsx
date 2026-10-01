import { useState, useEffect, useCallback } from "react";
import UserForm  from "./components/UserForm";
import UserTable from "./components/UserTable";
import { getUsers, createUser, updateUser, deleteUser } from "./api/userApi";
import "./App.css";

export default function App() {
  const [users, setUsers]             = useState([]);
  const [editingUser, setEditingUser] = useState(null);  // null = create mode
  const [loading, setLoading]         = useState(true);
  const [toast, setToast]             = useState(null);  // { msg, type }

  // ── Show a temporary toast notification ──────────────────────
  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  // ── Fetch all users from the API ──────────────────────────────
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getUsers();
      setUsers(res.data.data);
    } catch (err) {
      showToast("Failed to load users", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // ── Create or Update ──────────────────────────────────────────
  const handleSubmit = async (formData) => {
    try {
      if (editingUser) {
        await updateUser(editingUser.id, formData);
        showToast("User updated successfully!");
        setEditingUser(null);
      } else {
        await createUser(formData);
        showToast("User created successfully!");
      }
      fetchUsers();
    } catch (err) {
      const msg = err.response?.data?.message || "Something went wrong";
      showToast(msg, "error");
    }
  };

  // ── Delete ────────────────────────────────────────────────────
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteUser(id);
      showToast("User deleted.");
      fetchUsers();
    } catch (err) {
      showToast("Failed to delete user", "error");
    }
  };

  return (
    <div className="app">
      <header>
        <h1>📋 User Manager</h1>
        <p>Simple CRUD — React + Node.js + MySQL</p>
      </header>

      {/* Toast notification */}
      {toast && (
        <div className={`toast toast-${toast.type}`}>{toast.msg}</div>
      )}

      <main>
        <UserForm
          onSubmit={handleSubmit}
          editingUser={editingUser}
          onCancel={() => setEditingUser(null)}
        />
        <UserTable
          users={users}
          loading={loading}
          onEdit={setEditingUser}
          onDelete={handleDelete}
        />
      </main>
    </div>
  );
}
