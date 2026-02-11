import { Calendar as AntdCalendar } from "antd";
import type { CalendarProps } from "antd";
import type { Dayjs } from "dayjs";

export type Source = "year" | "month" | "date" | "customize";

type Props = {
  onPanelChange: (value: Dayjs, mode: CalendarProps<Dayjs>["mode"]) => void;
  onSelect: (date: Dayjs, info: { source: Source }) => void;
};

export const Calendar = ({ onPanelChange, onSelect }: Props) => {
  return (
    <AntdCalendar
      fullscreen={false}
      onPanelChange={onPanelChange}
      onSelect={onSelect}
    />
  );
};
