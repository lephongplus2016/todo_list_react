import React from "react";
import Todo from "./Todo";

export default function TodoList({ todoList, onCheckBtnClick }) {
  return (
    <>
    {/* các button todo được gọi và tạo ở Todo.js */}
      {todoList.map((todo) => (
        <Todo key={todo.id} todo={todo} onCheckBtnClick={onCheckBtnClick} />
      ))}
    </>
  );
}
