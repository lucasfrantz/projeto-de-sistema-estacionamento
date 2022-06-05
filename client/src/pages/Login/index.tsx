import { Input } from "../../components/Input";
import { Container, LoginFormContainer } from "./styles";
import { Form } from "@unform/web";
import { useRef } from "react";
import { api } from "../../services/api";
import { Link, useNavigate } from "react-router-dom";

import icon from "../../assets/logo.webp";

interface LoginFormData {
  login: string;
  password: string;
}

export function Login() {
  const formRef = useRef(null);
  const navigate = useNavigate();
  const handleSubmit = async (data: LoginFormData) => {
    console.log(data);

    try {
      const response = await api.post("/sessions/login", data);
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
        <img src={icon} style={{ width: "150px" }} alt="logo" />
        <Form ref={formRef} onSubmit={handleSubmit}>
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
        <Link to="/register">Registre-se aqui</Link>
      </LoginFormContainer>
    </Container>
  );
}
