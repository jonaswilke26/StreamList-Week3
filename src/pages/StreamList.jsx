import { useState } from "react";
import {
  FaCheck,
  FaPen,
  FaTrash,
} from "react-icons/fa";

function StreamList() {
  const [title, setTitle] = useState("");
  const [items, setItems] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (title.trim() === "") {
      return;
    }

    if (editingId !== null) {
      setItems(
        items.map((item) =>
          item.id === editingId
            ? { ...item, title: title }
            : item
        )
      );

      setEditingId(null);
    } else {
      const newItem = {
        id: Date.now(),
        title: title,
        completed: false,
      };

      setItems([...items, newItem]);
    }

    setTitle("");
  };

  const handleComplete = (id) => {
    setItems(
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              completed: !item.completed,
            }
          : item
      )
    );
  };

  const handleEdit = (item) => {
    setTitle(item.title);
    setEditingId(item.id);
  };

  const handleDelete = (id) => {
    setItems(
      items.filter((item) => item.id !== id)
    );

    if (editingId === id) {
      setEditingId(null);
      setTitle("");
    }
  };

  return (
    <section className="page">
      <div className="hero">
        <p className="eyebrow">
          YOUR PERSONAL WATCHLIST
        </p>

        <h1>What do you want to watch?</h1>

        <p className="hero-text">
          Keep track of movies and shows you want to watch.
        </p>

        <form
          className="stream-form"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Enter a movie or TV show..."
            value={title}
            onChange={(event) =>
              setTitle(event.target.value)
            }
          />

          <button type="submit">
            {editingId !== null
              ? "Update"
              : "Add to StreamList"}
          </button>
        </form>

        <div className="stream-list">
          <div className="list-heading">
            <h2>My StreamList</h2>

            <span className="item-count">
              {items.length}{" "}
              {items.length === 1
                ? "item"
                : "items"}
            </span>
          </div>

          {items.length === 0 ? (
            <p className="empty-message">
              Your StreamList is empty. Add something
              you want to watch!
            </p>
          ) : (
            items.map((item) => (
              <div
                className={`stream-item ${
                  item.completed
                    ? "completed"
                    : ""
                }`}
                key={item.id}
              >
                <span className="item-title">
                  {item.title}
                </span>

                <div className="item-actions">
                  <button
                    className="complete-button"
                    onClick={() =>
                      handleComplete(item.id)
                    }
                    title={
                      item.completed
                        ? "Mark incomplete"
                        : "Mark complete"
                    }
                    aria-label="Complete item"
                  >
                    <FaCheck />
                  </button>

                  <button
                    className="edit-button"
                    onClick={() =>
                      handleEdit(item)
                    }
                    title="Edit"
                    aria-label="Edit item"
                  >
                    <FaPen />
                  </button>

                  <button
                    className="delete-button"
                    onClick={() =>
                      handleDelete(item.id)
                    }
                    title="Delete"
                    aria-label="Delete item"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default StreamList;