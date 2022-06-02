import { Input } from "../../components/Input";
import { Container, LoginFormContainer } from "./styles";
import { Form } from "@unform/web";
import { useRef } from "react";
import { api } from "../../api";

interface LoginFormData {
  login: string;
  password: string;
}

export function Login() {
  const formRef = useRef(null);

  const handleSubmit = async (data: LoginFormData) => {
    console.log(data);

    try {
      const response = await api.post("/sessions/login", data);

      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container>
      <LoginFormContainer>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <div>
            <label htmlFor="login">Login: </label>
            <Input type="text" name="login" placeholder="Login" />
          </div>
          <div>
            <label htmlFor="password">Senha: </label>
            <Input type="password" name="password" placeholder="Senha" />
          </div>
          <div style={{ display: "flex", flexDirection: "row-reverse" }}>
            <button type="submit">Entrar</button>
          </div>
        </Form>
      </LoginFormContainer>
    </Container>
  );
}
