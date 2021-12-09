import TodoList from "./components/TodoList";
// https://atlassian.design/components/
// componets cần tải thư viện của atlassian trước   
import Textfield from "@atlaskit/textfield";
import Button from "@atlaskit/button";
import { useCallback, useState, useEffect } from "react";
import { v4 } from "uuid";

// đây là file main
// có thể gọi và sử dụng components ở folder components

const TODO_APP_STORAGE_KEY = "TODO_APP";

function App() {
  // có gì đó có thể lưu data?
  // -> useState
  const [todoList, setTodoList] = useState([]);
  const [textInput, setTextInput] = useState("");

  //KO BỊ mất khi tải lại
  useEffect(() => {
    const storagedTodoList = localStorage.getItem(TODO_APP_STORAGE_KEY);
    if (storagedTodoList) {
      setTodoList(JSON.parse(storagedTodoList));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(TODO_APP_STORAGE_KEY, JSON.stringify(todoList));
  }, [todoList]);

  // set những gì người dùng nhập vô -> value
  // useCallBack thì tải lại trang ko bị đổi db
  const onTextInputChange = useCallback((e) => {
    setTextInput(e.target.value);
  }, []);

  const onAddBtnClick = useCallback(
    (e) => {
      // them text input vao danh sach todoList
      // v4 từ uuid
      // auto sinh ra 1 id mới
      setTodoList([
        { id: v4(), name: textInput, isCompleted: false },
        ...todoList,
      ]);
// lưu rồi thì xóa trắng input đê
      setTextInput("");
    },
    [textInput, todoList]
  );

  const onCheckBtnClick = useCallback((id) => {
    setTodoList((prevState) =>
      prevState.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: true } : todo
      )
    );
  }, []);

  return (
    // <> là một field của reactjs
    // mọi thẻ phải ở trong div hoặc <>
    <>
      <h3>Danh sách cần làm</h3>
      {/* textfield là của altassian */}
      <Textfield
        name='add-todo'
        placeholder='Thêm việc cần làm...'
        // cái này cũng của altasion
        elemAfterInput={
          <Button
            isDisabled={!textInput}
            appearance='primary'
            onClick={onAddBtnClick}
          >
            Thêm
          </Button>
        }
        css={{ padding: "2px 4px 2px" }}
        value={textInput}
        onChange={onTextInputChange}
      ></Textfield>
      {/* hiển thị todoList */}
      <TodoList todoList={todoList} onCheckBtnClick={onCheckBtnClick} />
    </>
  );
}

export default App;
