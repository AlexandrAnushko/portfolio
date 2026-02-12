import { Calendar as AntdCalendar } from "antd";
import type { Dayjs } from "dayjs";

type Props = {
  onSelect: (date: Dayjs) => void;
};

export const Calendar = ({ onSelect }: Props) => {
  return <AntdCalendar fullscreen={false} onSelect={onSelect} />;
};
