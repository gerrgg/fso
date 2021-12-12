import styled from "styled-components";

const Input = styled.input.attrs((props) => ({
  type: "text",
  size: props.size || "1em",
}))`
  width: 100%;
  border: 1px solid #fff;
  background: transparent;
  padding: 12px 20px;
  font-size: 17px;
  color: #f7f7f7;
  box-sizing: border-box;
  margin-bottom: 1rem;
`;

export default Input;
