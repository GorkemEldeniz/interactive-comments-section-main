/* eslint-disable react/prop-types */
/* eslint-disable no-param-reassign */
import React, { useState } from "react";
import { nanoid } from "nanoid";
import { getContext } from "../Context/Context";

const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

function ReplyInput({ id, name, setReplyToggle, from }) {
  const { data, setData } = getContext();
  const {
    currentUser,
    currentUser: { image },
  } = data;

  const [replyMessage, setReplyMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const date = Date.now();
    let { comments } = data;
    // let lastID;
    const newComments = {
      user: {
        image: currentUser.image,
        username: currentUser.username,
      },
      createdAt: new Intl.DateTimeFormat(navigator.language, options).format(
        date
      ),
      content: replyMessage,
      from: from || id,
      id: nanoid(),
      replyingTo: name,
      score: 0,
    };
    if (from) {
      comments = comments.map((comment) => {
        if (comment.id === from) {
          comment.replies = [...comment.replies, newComments];
        }
        return comment;
      });
    } else {
      comments = comments.map((comment) => {
        if (comment.id === id) {
          comment.replies = [...comment.replies, newComments];
        }
        return comment;
      });
    }
    setData({ ...data, comments });
    setReplyToggle(false);
    setReplyMessage("");
  };

  return (
    <form className="reply-form" onSubmit={handleSubmit}>
      <img src={image.png} alt="Avatar" />
      <textarea
        name=""
        id=""
        onChange={(e) => setReplyMessage(e.target.value)}
      />
      <button type="submit">Reply</button>
    </form>
  );
}

export default ReplyInput;
