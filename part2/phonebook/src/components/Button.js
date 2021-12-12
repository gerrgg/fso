import styled from "styled-components";

const Button = styled.button`
  padding: 12px 18px;
  box-sizing: border-box;
  background: ${(props) => (props.secondary ? "#333" : "#00ff93")};
  color: ${(props) => (props.secondary ? "#00ff93" : "#333")};
  font-size: 17px;
  border: 1px solid #00ff93;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: ${(props) => (props.secondary ? "#00ff93" : "#333")};
    color: ${(props) => (props.secondary ? "#333" : "#00ff93")};
  }
`;

export default Button;
