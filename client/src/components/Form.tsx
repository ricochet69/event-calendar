// import { useState, ChangeEvent, FormEvent } from "react";
import { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

interface FormProps {
  title?: string;
  formArr: { label: string; name: string; type: string }[];
  submitBtn?: string;
  onSubmit?: (form: Record<string, string>) => void;
  redirect?: {
    label: string;
    link: {
      label: string;
      to: string;
    };
  };
}

interface FormTemplate {
  template: FormProps;
}

const prepareForm = (formArr) => {
  return formArr.reduce((r, v) => ({ ...r, [v.name]: "" }), {});
};

const Form = ({ template }: FormTemplate) => {
  const initialForm = prepareForm(template.formArr);
  console.log(initialForm);
  const [form, setForm] = useState(prepareForm(template.formArr));

  const onChangeHandler = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  const onSubmitHandler = () => onsubmit(form, () => setForm(initialForm));

  const hasRedirect = !!template.redirect;

  return (
    <SForm autoComplete={"off"}>
      <SFormTitle>{template.title}</SFormTitle>
      {template.formArr.map(({ label, name, type }, index) => (
        <SFormControl key={index}>
          <SLabel htmlFor={name}>{label}</SLabel>
          <SInput
            id={name}
            name={name}
            type={type}
            value={form[name]}
            onChange={(e) => onChangeHandler(e)}
          />
        </SFormControl>
      ))}
      <SButton
        onClick={(e) => {
          e.preventDefault();
          onSubmitHandler();
        }}
        type="submit"
      >
        {template.submitBtn}
      </SButton>
      {hasRedirect && (
        <SRedirect>
          <SRedirectLabel>{template.redirect.label}&nbsp;</SRedirectLabel>
          <SRedirectLink to={template.redirect.link.to}>
            {template.redirect.link.label}
          </SRedirectLink>
        </SRedirect>
      )}
    </SForm>
  );
};

// Form.defaultProps = {
//   // ... (unchanged)
// };

export default Form;

const SForm = styled.form`
  padding: 1.5rem;
  background-color: purple;
  color: #fff;
  border-radius: 0.65rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.8rem;
`;

const SFormTitle = styled.span`
  font-size: 2.5rem;
  text-align: center;
  margin: 1.2rem;
`;

const SFormControl = styled.div`
  :first-of-type {
    margin-top: 0.2rem;
  }
  :not(:last-of-type) {
    margin-bottom: 1rem;
  }
`;

const SLabel = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 600;
  margin-left: 4px;
  margin-bottom: 0.2rem;
`;

const SInput = styled.input`
  outline: none;
  border: 1px solid black;
  width: 100%;
  padding: 0.2rem;
  font-size: 14px;
  border-radius: 10px;
`;

const SButton = styled.button`
  width: 100%;
  background-color: #ccc;
  color: white;
  font-size: 14px;
  padding: 0.3rem;
  display: flex;
  justify-content: center;
  border-radius: 10px;
  margin-top: 0.2rem;
  cursor: pointer;
  /*  */
`;
const SRedirect = styled.div`
  font-size: 10px;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 0.3rem;
`;

const SRedirectLabel = styled.span`
  color: blue;
`;

const SRedirectLink = styled(Link)`
  color: orange;
`;
