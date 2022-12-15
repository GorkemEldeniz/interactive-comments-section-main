/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { nanoid } from "nanoid";
import Message from "./Message";
import Input from "./Input";
import { getContext } from "../Context/Context";

function Wrapper() {
  const { data, active } = getContext();
  const {
    comments,
    currentUser: { username },
  } = data;

  return (
    <section className="wrapper">
      {comments.map((comment) => (
        <>
          <Message {...comment} activeUser={username} key={nanoid()} />
          {comment?.replies.map((reply) => (
            <div className="sub" key={nanoid()}>
              <Message {...reply} activeUser={username} />
            </div>
          ))}
        </>
      ))}
      {active && <div className="shadow" />}
      <Input />
    </section>
  );
}

export default Wrapper;
