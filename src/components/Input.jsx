/* eslint-disable prefer-const */
import React, { useState } from "react";
import { getContext } from "../Context/Context";

const options = {
  dateStyle: "full",
};

function Input() {
  const { data, setData, active } = getContext();
  const [input, setInput] = useState("");

  let {
    currentUser: { username, image },
    comments,
  } = data;

  const handleSubmit = (e) => {
    e.preventDefault();
    const date = Date.now();
    const user = {
      id: comments.length + 1,
      content: input,
      createdAt: new Intl.DateTimeFormat(navigator.language, options).format(
        date
      ),
      score: 0,
      user: {
        username,
        image,
      },
      replies: [],
    };
    comments = [...comments, user];
    setData({ ...data, comments });
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className={active ? "msg passive" : "msg"}>
      <img src={`../images/${image.png}`} alt="Avatar" />
      <textarea
        type="text"
        placeholder="Add a comment..."
        name="content"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit">SEND</button>
    </form>
  );
}

export default Input;
