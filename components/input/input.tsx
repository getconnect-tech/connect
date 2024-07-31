"use client";
import SVGIcon from "@/assets/icons/SVGIcon";
import { Errormessage, Input, InputDiv, InputSection, Maindiv } from "./style";
interface Props {
  title?: string;
  placeholder: string;
  width?: any;
  hasError?: boolean;
  error?: string;
  className?: string;
  login?: boolean;
  value?: string;
  type?: "email" | "password" | "text";
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  onForgotClick?: Function;
}
const InputComponent: React.FC<Props> = (Props) => {
  const {
    title,
    placeholder,
    width,
    hasError,
    error,
    className,
    type,
    onChange,
    value,
    disabled,
    ...props
  } = Props;

  return (
    <Maindiv>
      <InputDiv>
        <InputSection>
          <Input
            placeholder={placeholder}
            width={width}
            hasError={hasError}
            className={className}
            onChange={onChange}
            disabled={disabled}
            type={type}
            value={value}
            {...props}
          />
        </InputSection>
      </InputDiv>
      {hasError && (
        <Errormessage>
          <SVGIcon
            name="error-icon"
            width="14"
            height="14"
            viewBox="0 0 14 14"
          />
          <p>{error}</p>
        </Errormessage>
      )}
    </Maindiv>
  );
};
export default InputComponent;
