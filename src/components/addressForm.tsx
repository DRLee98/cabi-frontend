import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { NewAddressData } from "types";
import { Postcode } from "../api/postCode";
import { myProfileQuery_myProfile_user_address } from "../__generated__/myProfileQuery";

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
  background-color: ${(prop) => prop.theme.disablelightBgColor};
  color: darkgray;
  grid-area: ${(prop) => prop.name};
  &::placeholder {
    color: darkgray;
  }
  &:first-child {
    border-top-left-radius: 10px;
  }
  &:last-child {
    border-radius: 0 0 10px 10px;
  }
`;

const SearchBtn = styled.span`
  min-width: max-content;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  cursor: pointer;
  background-color: ${(prop) => prop.theme.signatureBgColor};
  color: ${(prop) => prop.theme.signatureColor};
  font-size: 15px;
  font-weight: 600;
  border-top-right-radius: 10px;
`;

interface InputStyleProps {
  name: string;
}

interface InputProps {
  register: any;
  setAddressResult: Function;
  addressResult: NewAddressData | undefined;
  currentAddress?: myProfileQuery_myProfile_user_address | undefined;
}

export const AddressForm: React.FC<InputProps> = ({
  register,
  setAddressResult,
  addressResult,
  currentAddress,
}) => {
  const [postCodeLayer, setPostCodeLayer] = useState<Boolean>(false);
  const [zonecode, setZonecode] = useState<string | undefined>();
  const [address, setAddress] = useState<string | undefined>();

  const closePostcode = () => {
    setPostCodeLayer(false);
  };

  useEffect(() => {
    setPostCodeLayer(false);
    setZonecode(addressResult?.zonecode);
    setAddress(addressResult?.address);
  }, [addressResult]);

  return (
    <AddressBox>
      <Input
        ref={register}
        name="zonecode"
        placeholder="우편번호"
        value={zonecode || currentAddress?.zonecode || ""}
        disabled
      />
      <SearchBtn onClick={() => setPostCodeLayer(true)}>
        우편번호 검색
      </SearchBtn>
      <Input
        ref={register}
        name="address"
        placeholder="주소"
        value={address || currentAddress?.address || ""}
        disabled
      />
      {postCodeLayer && (
        <Postcode
          setAddressResult={setAddressResult}
          closePostcode={closePostcode}
        />
      )}
    </AddressBox>
  );
};
