import { Input } from "../../components/Input";
import { Container, LoginFormContainer } from "./styles";
import { Form } from "@unform/web";
import { useRef } from "react";
import { api } from "../../services/api";
import { Link, useNavigate } from "react-router-dom";

interface LoginFormData {
  email: string;
  name: string;
  phoneNumber: string;
  login: string;
  password: string;
}

export function Register() {
  const formRef = useRef(null);
  const navigate = useNavigate();
  const handleSubmit = async (data: LoginFormData) => {
    console.log(data);

    try {
      const response = await api.post("/sessions/register", data);
      localStorage.setItem(
        "@sistema-estacionamento:token",
        response.data.accessToken
      );

      localStorage.setItem(
        "@sistema-estacionamento:user",
        JSON.stringify(response.data.user)
      );
      navigate("/dashboard", { replace: true });
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container>
      <LoginFormContainer>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input label="Nome" type="text" name="name" placeholder="Nome" />
          <Input label="Email" type="text" name="email" placeholder="Email" />
          <Input
            label="Celular"
            type="text"
            name="phoneNumber"
            placeholder="Celular"
          />
          <Input label="Login" type="text" name="login" placeholder="Login" />
          <Input
            label="Senha"
            type="password"
            name="password"
            placeholder="Senha"
          />
          <div style={{ display: "flex", flexDirection: "row-reverse" }}>
            <button type="submit">Entrar</button>
          </div>
        </Form>
        <Link to="/login">Faça login</Link>
      </LoginFormContainer>
    </Container>
  );
}
