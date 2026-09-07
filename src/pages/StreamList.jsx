import { useEffect, useState } from "react";

function StreamList() {
  const [title, setTitle] = useState("");

  const [items, setItems] = useState(() => {
    try {
      const savedItems = localStorage.getItem("streamListItems");
      return savedItems ? JSON.parse(savedItems) : [];
    } catch (error) {
      console.error("Unable to load saved StreamList items:", error);
      return [];
    }
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    localStorage.setItem(
      "streamListItems",
      JSON.stringify(items)
    );
  }, [items]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (trimmedTitle === "") {
      return;
    }

    if (editingId !== null) {
      setItems(
        items.map((item) =>
          item.id === editingId
            ? { ...item, title: trimmedTitle }
            : item
        )
      );

      setEditingId(null);
    } else {
      const newItem = {
        id: Date.now(),
        title: trimmedTitle,
        completed: false,
      };

      setItems([...items, newItem]);
    }

    setTitle("");
  };

  const handleDelete = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleEdit = (item) => {
    setTitle(item.title);
    setEditingId(item.id);
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

  return (
    <section className="page">
      <div className="page-card">
        <h1>My StreamList</h1>

        <p>
          Add movies and shows that you want to watch.
          Your list will remain saved even after you
          refresh the page.
        </p>

        <form
          className="stream-form"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Enter a movie or show..."
            value={title}
            onChange={(event) =>
              setTitle(event.target.value)
            }
          />

          <button type="submit">
            {editingId !== null ? "Update" : "Add"}
          </button>
        </form>

        <div className="stream-list">
          {items.length === 0 ? (
            <p>
              Your StreamList is empty. Add something
              above to get started.
            </p>
          ) : (
            items.map((item) => (
              <div
                className="stream-item"
                key={item.id}
              >
                <span
                  style={{
                    textDecoration: item.completed
                      ? "line-through"
                      : "none",
                  }}
                >
                  {item.title}
                </span>

                <div className="stream-actions">
                  <button
                    type="button"
                    onClick={() =>
                      handleComplete(item.id)
                    }
                  >
                    {item.completed
                      ? "Undo"
                      : "Complete"}
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleEdit(item)
                    }
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleDelete(item.id)
                    }
                  >
                    Delete
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