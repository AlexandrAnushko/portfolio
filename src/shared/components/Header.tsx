"use client";

import { Tabs } from "antd";
import type { TabsProps } from "antd";

const onChange = (key: string) => {
  console.log(key);
};

const items: TabsProps["items"] = [
  {
    key: "sign-in",
    label: "Sign in",
    children: "Content of Sign in Tab",
  },
  {
    key: "sign-up",
    label: "Sign up",
    children: "Content of Sign up",
  },
];

export const Header = () => {
  return (
    <header className="flex">
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </header>
  );
};
