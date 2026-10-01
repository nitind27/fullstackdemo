/**
 * UserTable — displays the list of users with Edit and Delete actions.
 */
export default function UserTable({ users, onEdit, onDelete, loading }) {
  if (loading) {
    return <p className="status-msg">Loading users…</p>;
  }

  if (users.length === 0) {
    return <p className="status-msg">No users found. Add one above!</p>;
  }

  return (
    <div className="card">
      <h2>👥 Users ({users.length})</h2>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone || "—"}</td>
                <td>{new Date(user.created_at).toLocaleDateString()}</td>
                <td className="actions">
                  <button
                    className="btn btn-edit"
                    onClick={() => onEdit(user)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => onDelete(user.id)}
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
  );
}
