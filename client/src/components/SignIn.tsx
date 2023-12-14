import Form from "./Form";
import styled from "styled-components";

const SignIn = () => {
  const formData = {
    title: "Sign In",
    formArr: [
      {
        label: "Email",
        name: "email",
        type: "text",
      },
      {
        label: "Password",
        name: "password",
        type: "password",
      },
    ],
    submitBtn: "Sign In",
    onSubmit: (form) => {
      console.log(form);
    },
    redirect: {
      label: "Don't have an account?",
      link: {
        label: "Register",
        to: "/register",
      },
    },
  };

  return (
    <SFixedContainer size={275}>
      <Form template={formData} />
    </SFixedContainer>
  );
};

export default SignIn;

const SFlexContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface FixedContainerProps {
  size: number;
}
const SFixedContainer = styled.div<FixedContainerProps>`
  max-width: ${({ size }) => (!size ? "initial" : `${size}px`)};
  width: 100%;
  margin: 0 auto;
`;
