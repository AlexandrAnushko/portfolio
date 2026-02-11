"use client";

import { useEffect, useState, useTransition } from "react";
import { Checkbox, Input, Table } from "antd";
import type { TableColumnsType } from "antd";
import type { Dayjs } from "dayjs";
import { Modal } from "@/shared/components/antd/Modal";
import { Button } from "@/shared/components/antd/Button";
import { Calendar, Source } from "@/features/todo-list/Calendar";

import {
  getTodosByDate,
  addTodo,
  toggleTodo,
  deleteTodo,
  updateTodo,
} from "../actions/todos";

type Todo = {
  id: string;
  text: string;
  done: boolean;
  date: string;
};

export default function TodoClient() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [editText, setEditText] = useState("");
  const [selectedDate, setSelectedDate] = useState<string>(() =>
    new Date().toISOString().slice(0, 10),
  );

  const [isPending, startTransition] = useTransition();

  // загрузка задач выбранной даты
  const loadTodos = (date: string) => {
    startTransition(async () => {
      const data = await getTodosByDate(date);
      setTodos(data);
    });
  };

  useEffect(() => {
    loadTodos(selectedDate);
  }, [selectedDate]);

  const handleAdd = () => {
    startTransition(async () => {
      await addTodo(newTodo, selectedDate);
      loadTodos(selectedDate);
      setNewTodo("");
    });
  };

  const handleToggle = (id: string) => {
    startTransition(async () => {
      await toggleTodo(id);
      loadTodos(selectedDate);
    });
  };

  const handleDelete = (id: string) => {
    startTransition(async () => {
      await deleteTodo(id);
      loadTodos(selectedDate);
    });
  };

  const handleSaveEdit = () => {
    if (!editingTodo) return;

    startTransition(async () => {
      await updateTodo(editingTodo.id, editText);
      loadTodos(selectedDate);
      setEditingTodo(null);
    });
  };

  const columns: TableColumnsType<Todo> = [
    {
      title: "Задача",
      key: "task",
      render: (_, item) => (
        <div className="flex items-center gap-3 w-full">
          <Checkbox
            checked={item.done}
            onChange={() => handleToggle(item.id)}
          />

          <div
            style={{
              flex: 1,
              textDecoration: item.done ? "line-through" : "none",
              opacity: item.done ? 0.6 : 1,
            }}
          >
            {item.text}
          </div>

          <div className="flex gap-2">
            <Button
              text="Изменить"
              color="green"
              onClick={() => {
                setEditingTodo(item);
                setEditText(item.text);
              }}
            />
            <Button
              text="Удалить"
              color="red"
              onClick={() => handleDelete(item.id)}
            />
          </div>
        </div>
      ),
    },
    {
      title: "Дата",
      dataIndex: "date",
      render: (d) => new Date(d).toLocaleDateString(),
      width: 120,
    },
  ];

  const onSelect = (date: Dayjs, info: { source: Source }) => {
    const iso = date.format("YYYY-MM-DD");
    setSelectedDate(iso);
  };

  return (
    <>
      <div className="flex gap-10 p-4">
        <div className="w-75">
          <Calendar onPanelChange={() => {}} onSelect={onSelect} />
        </div>

        <div className="flex flex-col max-w-200 min-w-200">
          <div className="flex gap-2 mb-4">
            <Input
              placeholder="Добавить задачу..."
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onPressEnter={handleAdd}
            />
            <Button onClick={handleAdd} text="Добавить" color="blue" />
          </div>

          <Table
            dataSource={todos}
            columns={columns}
            rowKey="id"
            pagination={false}
          />
        </div>
      </div>

      <Modal
        title="Изменить задачу"
        open={!!editingTodo}
        onOk={handleSaveEdit}
        onCancel={() => setEditingTodo(null)}
      >
        <Input
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onPressEnter={handleSaveEdit}
        />
      </Modal>
    </>
  );
}
