import React, { useEffect, useState } from "react";
import { AddressData } from "react-daum-postcode";
import styled from "styled-components";
import { Postcode } from "../api/postCode";

const AddressBox = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template:
    "zonecode searchBtn" 1fr
    "address address" 1fr / 3fr 1fr;
`;

const Input = styled.input<InputStyleProps>`
  display: block;
  padding: 0.8em 1.5em;
  border-bottom: 1px solid #c1c1c1;
  background-color: #f3f3f3;
  color: darkgray;
  grid-area: ${(prop) => prop.name};
  &::placeholder {
    color: darkgray;
  }
`;

const SearchBtn = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: olive;
  color: white;
`;

interface InputStyleProps {
  name: string;
}

interface InputProps {
  register: any;
  setAddressResult: React.Dispatch<
    React.SetStateAction<AddressData | undefined>
  >;
  zonecode: string | undefined;
  address: string | undefined;
}

export const AddressForm: React.FC<InputProps> = ({
  register,
  setAddressResult,
  zonecode,
  address,
}) => {
  const [postCodeLayer, setPostCodeLayer] = useState<Boolean>(false);

  useEffect(() => {
    setPostCodeLayer(false);
  }, [zonecode]);

  return (
    <AddressBox>
      <Input
        ref={register}
        name="zonecode"
        placeholder="우편번호"
        value={zonecode}
        disabled
      />
      <SearchBtn onClick={() => setPostCodeLayer(true)}>
        우편번호 검색
      </SearchBtn>
      <Input
        ref={register}
        name="address"
        placeholder="주소"
        value={address}
        disabled
      />
      {postCodeLayer && <Postcode setAddressResult={setAddressResult} />}
    </AddressBox>
  );
};
