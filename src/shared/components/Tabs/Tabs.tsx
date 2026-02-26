import { ReactNode } from "react";
import { Tab } from "./Tab";
import { TTab } from "./types";

export const ADD_TAB_ID = "__add_tab_id";

type Props = {
  tabs: TTab[];
  activeId: string;
  editingTabId: string | null;
  EditingInput: ReactNode;
  onTabClick: (id: string) => void;
  onTabDoubleClick: (id: string, currentName: string) => void;
  onAddClick: () => void;
  plusTabTitle?: string;
};

export const Tabs = ({
  tabs,
  activeId,
  editingTabId,
  EditingInput,
  onTabClick,
  onTabDoubleClick,
  onAddClick,
  plusTabTitle = "New Tab",
}: Props) => {
  return (
    <div className="flex items-end gap-0.5">
      {tabs.map((tab) => (
        <Tab
          key={tab.id}
          name={tab.name}
          title={tab.name}
          active={tab.id === activeId}
          onClick={() => onTabClick(tab.id)}
          onDoubleClick={() => onTabDoubleClick(tab.id, tab.name)}
          isEditing={tab.id === editingTabId}
          EditingInput={EditingInput}
        />
      ))}
      <Tab
        name="+"
        title={plusTabTitle}
        active={false}
        onClick={onAddClick}
        isEditing={editingTabId === ADD_TAB_ID}
        EditingInput={EditingInput}
        isAdd
      />
    </div>
  );
};
