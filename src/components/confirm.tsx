import { MouseEventHandler } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Input } from "./Input";
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

const ConfirmBox = styled.div`
  padding: 1em 2em;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.whiteColor};
`;

const ConfirmText = styled.strong`
  display: block;
  padding: 1em;
  text-align: center;
`;

const ConfirmBtnBox = styled(FlexCenterBox)`
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

const OkBtn = styled(Button)<OkBtnProp>`
  color: ${({ valid, theme }) => !valid && theme.disableColor};
  background-color: ${({ valid, theme }) => !valid && theme.disableBgColor};
  cursor: ${({ valid, theme }) => !valid && "auto"};
  &:hover {
    color: ${({ valid, theme }) => !valid && theme.disableColor};
    background-color: ${({ valid, theme }) => valid && theme.blueColor};
  }
`;

const CancelBtn = styled(Button)`
  &:hover {
    background-color: ${({ theme }) => theme.redColor};
  }
`;

const ErrorMsg = styled.p`
  text-align: center;
  font-weight: 400;
  color: ${({ theme }) => theme.redColor};
`;

interface OkBtnProp {
  valid?: boolean;
}

interface PasswordConfirmFormProp {
  password: string;
}

interface ConfirmProp {
  text: string;
  errorMsg?: string | null;
  okFn: Function;
  cancelFn: MouseEventHandler<HTMLButtonElement>;
}

export const Confirm: React.FC<ConfirmProp> = ({ text, okFn, cancelFn }) => {
  return (
    <Dim>
      <ConfirmBox>
        <ConfirmText>{text}</ConfirmText>
        <ConfirmBtnBox>
          <OkBtn
            valid={true}
            onClick={() => {
              okFn();
            }}
          >
            ??????
          </OkBtn>
          <CancelBtn onClick={cancelFn}>??????</CancelBtn>
        </ConfirmBtnBox>
      </ConfirmBox>
    </Dim>
  );
};

export const PasswordConfirm: React.FC<ConfirmProp> = ({
  text,
  errorMsg,
  okFn,
  cancelFn,
}) => {
  const { register, getValues, formState, errors } =
    useForm<PasswordConfirmFormProp>({
      mode: "onChange",
    });

  const ok = () => {
    const { password } = getValues();
    okFn(password);
  };
  return (
    <Dim>
      <ConfirmBox>
        <ConfirmText>{text}</ConfirmText>
        <Input
          register={register({
            required: "??????????????? ????????? ?????????.",
            minLength: 5,
            maxLength: 15,
          })}
          name={"password"}
          type={"password"}
          error={
            errors.password?.type === "maxLength" ||
            errors.password?.type === "minLength"
              ? "??????????????? 5???????????? 15?????? ?????????."
              : errors.password?.message
          }
        />
        {errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}
        <ConfirmBtnBox>
          <OkBtn
            valid={formState.isValid}
            onClick={() => {
              ok();
            }}
          >
            ??????
          </OkBtn>
          <CancelBtn onClick={cancelFn}>??????</CancelBtn>
        </ConfirmBtnBox>
      </ConfirmBox>
    </Dim>
  );
};
