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
  onTabDelete?: (id: string) => Promise<void>;
  plusTabTitle?: string;
  deleteTabText?: string;
};

export const Tabs = ({
  tabs,
  activeId,
  editingTabId,
  EditingInput,
  onTabClick,
  onTabDoubleClick,
  onTabDelete,
  onAddClick,
  plusTabTitle = "New Tab",
  deleteTabText,
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
          onDelete={onTabDelete ? () => onTabDelete(tab.id) : undefined}
          isEditing={tab.id === editingTabId}
          EditingInput={EditingInput}
          deleteTabText={deleteTabText}
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
