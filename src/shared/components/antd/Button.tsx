import { Button as AntdButton } from "antd";
import type { ButtonProps } from "antd";
import { createStyles } from "antd-style";

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

const stylesObject: ButtonProps["styles"] = {
  root: {
    backgroundColor: "transparent",
  },
};

type Props = {
  text: string;
  onClick: () => void;
  type?: "link" | "text" | "dashed" | "default" | "primary";
};

export const Button = ({ text, onClick, type = "default" }: Props) => {
  const { styles: classNames } = useStyles();
  return (
    <AntdButton
      onClick={onClick}
      type={type}
      classNames={classNames}
      styles={stylesObject}
    >
      {text}
    </AntdButton>
  );
};
