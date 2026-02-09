import { Button as AntdButton } from "antd";
import type { ButtonProps } from "antd";
import { createStyles } from "antd-style";

type Color = "red" | "green" | "blue" | "transparent";

type Props = {
  text: string;
  onClick: () => void;
  type?: "link" | "text" | "dashed" | "default" | "primary";
  color?: Color;
};

const useStyles = createStyles(({ token }) => ({
  root: {
    border: `1px solid ${token.colorBorder}`,
    borderRadius: token.borderRadius,
    padding: `${token.paddingXS}px ${token.padding}px`,
    height: "auto",

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
    color: "white",
  },
}));

const colors: Record<Color, string> = {
  red: "#b82121",
  green: "#35b821",
  blue: "#0083ff",
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
  color = "transparent",
}: Props) => {
  const { styles: classNames } = useStyles();
  return (
    <AntdButton
      onClick={onClick}
      type={type}
      classNames={classNames}
      styles={stylesObject(color)}
    >
      {text}
    </AntdButton>
  );
};
