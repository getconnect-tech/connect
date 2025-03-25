import { Component } from 'react';
import styled, { css } from 'styled-components';
import { isEmpty } from '@/helpers/common';
import { RANDOM_COLORS } from '@/global/constants';

const UserLogoWrapper = styled.div`
  display: flex;
  z-index: 1;
`;
const UserLogo: any = styled.img`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  ${(props: any) =>
    props.size &&
    css`
      width: ${props.size}px;
      height: ${props.size}px;
      border-radius: ${props.size}px;
      object-fit: cover;
    `}
  ${(props: any) =>
    props.isShowBorder &&
    css`
      border: var(--border-main);
      border-radius: 50%;
    `}
`;

const TextWrapper: any = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  display: flex;
  ${(props: any) =>
    props.size &&
    css`
      width: ${props.size}px;
      height: ${props.size}px;
      border-radius: ${props.size}px;
      background: ${props.randColor};
      span {
        font-size: ${props.size - props.size / 2}px;
        color: var(--text);
      }
    `}
`;

interface Props {
  imgSrc: string;
  size?: number;
  name: string;
  email?: string;
  isShowBorder?: boolean;
  classname?: string;
}

class Avatar extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  getAvtarName = (name: string) => {
    if (isEmpty(name)) {
      return '#';
    }
    const splitedName = name.trim().split(' ');
    if (splitedName.length === 1) {
      return this.getChar(name);
    } else {
      if (splitedName[1].trim() === '') {
        return this.getChar(name);
      } else {
        return this.getChar(splitedName[0]) + this.getChar(splitedName[1]);
      }
    }
  };

  getChar = (value: string) => {
    return value.charAt(0).toUpperCase();
  };

  getAsciiChar = (name: string) => {
    return this.getChar(name).charCodeAt(0);
  };

  getColorIndex = (name: string) => {
    const asciiValue = this.getAsciiChar(name);
    const colorIndex = (asciiValue - 64) % (RANDOM_COLORS.length - 1);
    return colorIndex;
  };

  render() {
    const props: Props = this.props;
    const { imgSrc, size, name, classname, isShowBorder } = props;
    const avtarName = this.getAvtarName(name);
    const colorIndex = this.getColorIndex(avtarName);
    const randColor = RANDOM_COLORS[colorIndex];
    return (
      <UserLogoWrapper>
        {imgSrc ? (
          <UserLogo
            size={size}
            src={imgSrc}
            isShowBorder={isShowBorder}
            className={classname}
          />
        ) : (
          <TextWrapper
            randColor={randColor}
            size={size}
            isShowBorder={isShowBorder}
            className={classname}
          >
            <span>{avtarName}</span>
          </TextWrapper>
        )}
      </UserLogoWrapper>
    );
  }
}

export default Avatar;
