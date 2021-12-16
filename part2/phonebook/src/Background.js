import styled from "styled-components";
import React, { useEffect, useState } from "react";

const Image = styled.div`
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  position: absolute;
  left: 0;
  top: 0;
  background: url("${(props) => props.url}") no-repeat center/cover;
  z-index: -1;
`;

const Background = ({ url }) => <Image url={url} />;

export default Background;
