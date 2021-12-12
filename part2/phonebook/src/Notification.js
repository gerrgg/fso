import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  border: 1px solid paleviolet;
  background: paleviolet;
  color: white;
  font-size: 22px;
  line-height: 28px;
  text-align: center;
`;

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <Wrapper>{message}</Wrapper>;
};

export default Notification;
