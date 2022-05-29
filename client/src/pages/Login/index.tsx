import { Container, LoginFormContainer } from "./styles";

export function Login() {
  // const handleSubmit = (data: any) => {
  //   console.log(data);
  // };

  return (
    <Container>
      <LoginFormContainer>
        <form>
          <div>
            <label htmlFor="login">Login: </label>
            <input type="text" name="login" placeholder="Login" />
          </div>
          <div>
            <label htmlFor="password">Senha: </label>
            <input type="password" name="password" placeholder="Senha" />
          </div>
          <div style={{ display: "flex", flexDirection: "row-reverse" }}>
            <button>Entrar</button>
          </div>
        </form>
      </LoginFormContainer>
    </Container>
  );
}
