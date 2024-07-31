"use client";
import SVGIcon from "@/assets/icons/SVGIcon";
import { Errormessage, InputBox, InputDiv, InputSection, Maindiv } from "./style";
interface Props {
  title?: string;
  placeholder: string;
  hasError?: boolean;
  error?: string;
  className?: string;
  login?: boolean;
  value?: string;
  type?: "email" | "password" | "text";
  onChange?: () => void;
  disabled?: boolean;
}
const Input: React.FC<Props> = (Props) => {
  const {
    title,
    placeholder,
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
          <InputBox
            placeholder={placeholder}
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
export default Input;
