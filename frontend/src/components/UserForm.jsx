import { useState, useEffect } from "react";

/**
 * UserForm — used for both Create and Edit.
 * Props:
 *   onSubmit(formData)  — called when form is submitted
 *   editingUser         — user object to pre-fill when editing (null = create mode)
 *   onCancel()          — called when Cancel is clicked
 */
export default function UserForm({ onSubmit, editingUser, onCancel }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState({});

  // Pre-fill the form when editing an existing user
  useEffect(() => {
    if (editingUser) {
      setForm({
        name:  editingUser.name  || "",
        email: editingUser.email || "",
        phone: editingUser.phone || "",
      });
    } else {
      setForm({ name: "", email: "", phone: "" });
    }
    setErrors({});
  }, [editingUser]);

  const validate = () => {
    const errs = {};
    if (!form.name.trim())  errs.name  = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Enter a valid email";
    return errs;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    onSubmit(form);
  };

  return (
    <div className="card">
      <h2>{editingUser ? "✏️ Edit User" : "➕ Add New User"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name *</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full name"
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label>Email *</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="user@example.com"
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="555-0100 (optional)"
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {editingUser ? "Update" : "Create"}
          </button>
          {editingUser && (
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
