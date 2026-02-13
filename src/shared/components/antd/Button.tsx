import { Button as AntdButton } from "antd";
import type { ButtonProps } from "antd";
import { createStyles } from "antd-style";
import { ReactNode } from "react";

type Color =
  | "red"
  | "lightRed"
  | "green"
  | "lightGreen"
  | "blue"
  | "white"
  | "transparent";

type Props = {
  onClick?: () => void;
  text?: string;
  type?: "link" | "text" | "dashed" | "default" | "primary";
  htmlType?: "button" | "reset" | "submit";
  color?: Color;
  height?: string;
  icon?: ReactNode;
  shape?: "round" | "default" | "square" | "circle";
  className?: string;
  containerClassName?: string;
};

const useStyles = createStyles<{ height?: string; color: Color }>(
  ({ token }, params) => ({
    root: {
      width: "100%",
      border: `1px solid ${token.colorBorder}`,
      borderRadius: token.borderRadius,
      padding: `${token.paddingXS}px ${token.padding}px`,
      height: params.height ?? "auto",

      "&:focus, &:focus-visible, &:focus-within": {
        outline: "none !important",
        boxShadow: "none !important",
      },
      "&.ant-btn:focus-visible": {
        outline: "none !important",
        boxShadow: "inset 0 0 0 2px #1677ff !important",
      },
    },
    content: {
      color: params.color === "white" ? "black" : "white",
    },
  }),
);

const colors: Record<Color, string> = {
  lightRed: "#c25959",
  red: "#b82121",
  lightGreen: "#aff5a4",
  green: "#35b821",
  blue: "#1457b5",
  white: "#ffffff",
  transparent: "transparent",
};

const stylesObject = (color: Color): ButtonProps["styles"] => ({
  root: {
    backgroundColor: colors[color],
  },
});

export const Button = ({
  text,
  onClick,
  type = "default",
  htmlType = "button",
  color = "transparent",
  height,
  icon,
  shape = "default",
  className,
  containerClassName = "",
}: Props) => {
  const { styles: classNames } = useStyles({ color, height });
  return (
    <div className={`${containerClassName} w-full`}>
      <AntdButton
        onClick={onClick}
        type={type}
        htmlType={htmlType}
        classNames={classNames}
        styles={stylesObject(color)}
        icon={icon}
        shape={shape}
        className={className}
      >
        {text}
      </AntdButton>
    </div>
  );
};
