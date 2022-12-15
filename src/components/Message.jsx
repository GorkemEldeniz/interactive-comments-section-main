/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
import React, { useState, useRef } from "react";
import { getContext } from "../Context/Context";
import ReplyInput from "./ReplyInput";

function Message({
  activeUser,
  score,
  user: { username, image },
  createdAt,
  content,
  id,
  from,
  replies,
}) {
  const isUser = activeUser === username;
  const [edit, setEdit] = useState(false);
  // const [openModal, setOpenModal] = useState(false);
  const { data, setData, setActive, active } = getContext();
  const [replyToggle, setReplyToggle] = useState(false);
  const contentRef = useRef();

  const handleEdit = () => {
    setEdit(true);
    contentRef.current.focus();
  };

  const handleAdd = () => {
    let { comments } = data;
    if (from) {
      comments = comments.map((comment) => {
        if (comment.id === from) {
          comment.replies.map((reply) => {
            if (reply.id === id) {
              reply.score += 1;
            }
            return reply;
          });
        }
        return comment;
      });
    } else {
      comments = comments.map((comment) => {
        if (comment.id === id) {
          comment.score += 1;
        }
        return comment;
      });
    }
    setData({ ...data, comments });
  };

  const handleAbstract = () => {
    let { comments } = data;
    if (from) {
      comments = comments.map((comment) => {
        if (comment.id === from) {
          comment.replies.map((reply) => {
            if (reply.id === id) {
              reply.score -= 1;
            }
            return reply;
          });
        }
        return comment;
      });
    } else {
      comments = comments.map((comment) => {
        if (comment.id === id) {
          comment.score -= 1;
        }
        return comment;
      });
    }
    setData({ ...data, comments });
  };

  const handleContent = () => {
    setEdit(true);
    let { comments } = data;
    if (from) {
      comments = comments.map((comment) => {
        if (comment.id === from) {
          comment.replies.map((reply) => {
            if (reply.id === id) {
              reply.content = contentRef.current.value;
            }
            return reply;
          });
        }
        return comment;
      });
    } else {
      comments = comments.map((comment) => {
        if (comment.id === id) {
          comment.content = contentRef.current.value;
        }
        return comment;
      });
    }
    setData({ ...data, comments });
  };

  const handleDelete = () => {
    setActive(false);
    let { comments } = data;
    if (from) {
      comments = comments.map((comment) => {
        if (comment.id === from) {
          comment.replies = comment.replies.filter((reply) => reply.id !== id);
        }
        return comment;
      });
    } else {
      comments = comments.filter((comment) => comment.id !== id);
    }
    setData({ ...data, comments });
  };

  return (
    <>
      <div className="msg">
        <div className="score">
          <button type="button" onClick={handleAdd}>
            +
          </button>
          <h1>{score}</h1>
          <button type="button" onClick={handleAbstract}>
            -
          </button>
        </div>

        <article>
          <header>
            <img className="avatar" src={`../images/${image.png}`} alt="Avatar" />
            <h2 className="name">{username}</h2>
            {isUser && <h2 className="you">you</h2>}
            <h2 className="time">{createdAt}</h2>
            {isUser ? (
              <div className="btn">
                <button
                  type="button"
                  onClick={() => setActive(true)}
                  className="delete"
                >
                  Delete
                </button>
                <button type="button" className="edit" onClick={handleEdit}>
                  Edit
                </button>
              </div>
            ) : (
              <div className="btn">
                <button
                  type="button"
                  onClick={() => setReplyToggle(!replyToggle)}
                >
                  Reply
                </button>
              </div>
            )}
          </header>

          <textarea
            className={isUser ? "user" : undefined}
            readOnly={!edit}
            disabled={!isUser}
            defaultValue={content}
            rows="5"
            ref={contentRef}
            onBlur={handleContent}
          />
        </article>

        {replyToggle && (
          <ReplyInput
            id={id}
            name={username}
            replies={replies}
            setReplyToggle={setReplyToggle}
            from={from}
          />
        )}
      </div>
      {active && (
        <div className="delete-modal">
          <h1>Delete comment</h1>
          <p>
            Are you sure you want to delete this comment? This will remove the
            comment and can not be undone
          </p>
          <div className="btn">
            <button
              className="cancel"
              type="button"
              onClick={() => setActive(false)}
            >
              NO,CANCEL
            </button>
            <button className="delete" type="button" onClick={handleDelete}>
              YES,DELETE
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Message;
