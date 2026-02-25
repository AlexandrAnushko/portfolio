import { Tab } from "./Tab";
import { TTab } from "./types";

type Props = {
  tabs: TTab[];
  activeId: string;
  onTabClick: (id: string) => void;
  onAddClick: () => void;
};

export const Tabs = ({ tabs, activeId, onTabClick, onAddClick }: Props) => {
  return (
    <div className="flex items-end gap-0.5">
      {tabs.map((tab) => (
        <Tab
          key={tab.id}
          name={tab.name}
          active={tab.id === activeId}
          onClick={() => onTabClick(tab.id)}
        />
      ))}
      <Tab name="+" active={false} onClick={onAddClick} isAdd />
    </div>
  );
};
