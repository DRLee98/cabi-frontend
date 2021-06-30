import { MouseEventHandler } from "react";
import styled from "styled-components";
import { FlexCenterBox } from "./styledComponent";

const Dim = styled(FlexCenterBox)`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgb(37 37 37 / 60%);
  overflow: hidden;
  z-index: 999;
`;

const AlertBox = styled.div`
  padding: 1em;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.whiteColor};
`;

const AlertText = styled.strong`
  display: block;
  padding: 1em;
`;

const AlertBtnBox = styled(FlexCenterBox)`
  margin-top: 1em;
`;

const Button = styled.button`
  width: 40%;
  text-align: center;
  padding: 1em 0.9em;
  border-radius: 10px;
  & + & {
    margin-left: 10px;
  }
  &:hover {
    color: ${({ theme }) => theme.whiteColor};
  }
  transition: all 0.3s ease;
  cursor: pointer;
`;

const OkBtn = styled(Button)`
  &:hover {
    background-color: ${({ theme }) => theme.blueColor};
  }
`;

const CancelBtn = styled(Button)`
  &:hover {
    background-color: ${({ theme }) => theme.redColor};
  }
`;

interface AlertProp {
  text: string;
  okFn: MouseEventHandler<HTMLButtonElement>;
  cancelFn: MouseEventHandler<HTMLButtonElement>;
}

export const Alert: React.FC<AlertProp> = ({ text, okFn, cancelFn }) => {
  return (
    <Dim>
      <AlertBox>
        <AlertText>{text}</AlertText>
        <AlertBtnBox>
          <OkBtn onClick={okFn}>확인</OkBtn>
          <CancelBtn onClick={cancelFn}>취소</CancelBtn>
        </AlertBtnBox>
      </AlertBox>
    </Dim>
  );
};
