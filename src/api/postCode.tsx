import React from "react";
import DaumPostcode, { AddressData } from "react-daum-postcode";
import styled from "styled-components";

const LayerBackGround = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(37 37 37 / 60%);
`;

interface PostcodeProps {
  setAddressResult: React.Dispatch<
    React.SetStateAction<AddressData | undefined>
  >;
}

export const Postcode: React.FC<PostcodeProps> = ({ setAddressResult }) => {
  const handleComplete = (data: any) => {
    setAddressResult(data);
  };

  const styles = { maxWidth: "750px" } as React.CSSProperties;

  return (
    <LayerBackGround>
      <DaumPostcode
        onComplete={handleComplete}
        width={"50vw"}
        height={"80vh"}
        style={styles}
      />
    </LayerBackGround>
  );
};
