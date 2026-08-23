import { useState } from "react";

function StreamList() {
  const [title, setTitle] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (title.trim() === "") {
      return;
    }

    console.log("StreamList entry:", title);

    setTitle("");
  };

  return (
    <section className="page">
      <div className="hero">
        <p className="eyebrow">
          YOUR PERSONAL WATCHLIST
        </p>

        <h1>
          What do you want to watch?
        </h1>

        <p className="hero-text">
          Keep track of movies and shows you want to watch.
        </p>

        <form className="stream-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter a movie or TV show..."
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />

          <button type="submit">
            Add to StreamList
          </button>
        </form>
      </div>
    </section>
  );
}

export default StreamList;