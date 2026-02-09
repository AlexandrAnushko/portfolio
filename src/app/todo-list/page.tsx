"use client";

import { useEffect, useState, useTransition } from "react";
import { Card, Checkbox, Flex, Input, Table } from "antd";
import type { TableColumnsType } from "antd";
import { Modal } from "@/shared/components/antd/Modal";
import { Button } from "@/shared/components/antd/Button";

import {
  getTodos,
  addTodo,
  toggleTodo,
  deleteTodo,
  updateTodo,
} from "../actions/todos";

type Todo = {
  id: string;
  text: string;
  done: boolean;
};

export default function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [editText, setEditText] = useState("");
  const [isPending, startTransition] = useTransition();

  // загрузка с сервера
  useEffect(() => {
    startTransition(async () => {
      const data = await getTodos();
      setTodos(data);
    });
  }, []);

  const handleAdd = () => {
    startTransition(async () => {
      await addTodo(newTodo);
      setTodos(await getTodos());
      setNewTodo("");
    });
  };

  const handleToggle = (id: string) => {
    startTransition(async () => {
      await toggleTodo(id);
      setTodos(await getTodos());
    });
  };

  const handleDelete = (id: string) => {
    startTransition(async () => {
      await deleteTodo(id);
      setTodos(await getTodos());
    });
  };

  const handleSaveEdit = () => {
    if (!editingTodo) return;

    startTransition(async () => {
      await updateTodo(editingTodo.id, editText);
      setTodos(await getTodos());
      setEditingTodo(null);
    });
  };

  const columns: TableColumnsType<Todo> = [
    {
      title: "Задача",
      key: "task",
      render: (_, item) => (
        <Flex align="center" gap={12} style={{ width: "100%" }}>
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

          <Flex gap={8}>
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
          </Flex>
        </Flex>
      ),
    },
  ];

  return (
    <Flex justify="center" style={{ marginTop: 40 }}>
      <Card title="Задачи" style={{ width: 600 }}>
        <Flex gap={8} style={{ marginBottom: 16 }}>
          <Input
            placeholder="Добавить задачу..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onPressEnter={handleAdd}
          />
          <Button onClick={handleAdd} text="Добавить" color="blue" />
        </Flex>

        <Table
          dataSource={todos}
          columns={columns}
          rowKey="id"
          pagination={false}
        />
      </Card>

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
    </Flex>
  );
}
