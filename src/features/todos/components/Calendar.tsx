import { Calendar as AntdCalendar } from "antd";
import type { Dayjs } from "dayjs";
import { Button } from "@/shared/components/antd/Button";

type Props = {
  onSelect: (date: Dayjs) => void;
  onShowAll?: () => void;
  value?: Dayjs;
};

export const Calendar = ({ onSelect, onShowAll, value }: Props) => {
  return (
    <div className="flex flex-col gap-y-2">
      <AntdCalendar fullscreen={false} onSelect={onSelect} value={value} />
      {onShowAll && (
        <Button
          onClick={onShowAll}
          text="Show tasks for all time"
          color="transparent"
        />
      )}
    </div>
  );
};
