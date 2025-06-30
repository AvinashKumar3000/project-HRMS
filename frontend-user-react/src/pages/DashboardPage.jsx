import { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router';

function Card({ obj, onDelete, onEdit, onUpdate, onChange }) {
  return (
    <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow-md mb-4">
      {obj.isEditing ? (
        <input
          type="text"
          value={obj.text}
          onChange={(e) => onChange(obj.id, e.target.value)}
          className="flex-1 mr-4 px-3 py-2 border border-gray-300 rounded"
        />
      ) : (
        <span className="flex-1 text-gray-800">{obj.text}</span>
      )}

      <div className="flex gap-2">
        {obj.isEditing ? (
          <button
            onClick={() => onUpdate(obj.id)}
            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Update
          </button>
        ) : (
          <button
            onClick={() => onEdit(obj.id)}
            className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            Edit
          </button>
        )}

        <button
          onClick={() => onDelete(obj.id)}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { isAuth, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    if (!isAuth) {
      navigate('/');
    }
  }, [isAuth, navigate]);

  function handleAddItem(e) {
    e.preventDefault();
    if (newItem.trim() === '') return;

    const newTodo = {
      id: Date.now(),
      text: newItem,
      isEditing: false,
    };

    setItems((prev) => [...prev, newTodo]);
    setNewItem('');
  }

  function handleDelete(id) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  function handleEdit(id) {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isEditing: true } : item
      )
    );
  }

  function handleUpdate(id) {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isEditing: false } : item
      )
    );
  }

  function handleChange(id, newText) {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, text: newText } : item
      )
    );
  }

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-700">Welcome to Service center</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Logout
        </button>
      </header>

      <form onSubmit={handleAddItem} className="flex gap-4 mb-6">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Enter new todo..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Add
        </button>
      </form>

      <section>
        {items.length === 0 ? (
          <p className="text-gray-500">No todos yet. Add something!</p>
        ) : (
          items.map((item) => (
            <Card
              key={item.id}
              obj={item}
              onDelete={handleDelete}
              onEdit={handleEdit}
              onUpdate={handleUpdate}
              onChange={handleChange}
            />
          ))
        )}
      </section>
    </div>
  );
}
