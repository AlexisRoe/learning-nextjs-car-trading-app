import { useRef } from "react";

const Login = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleLogin = () => {
    const sendLogin = async (
      route: string,
      email: string,
      password: string
    ) => {
      try {
        const response = await fetch(route, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });
        const json = await response.json();
        console.log(JSON.stringify(json));
      } catch (error) {
        console.error(error.message);
      }
    };

    sendLogin(
      "http://localhost:3000/api/login",
      emailRef.current?.value,
      passwordRef.current?.value
    );
  };

  return (
    <div>
      <input type="text" placeholder="email" ref={emailRef} />
      <input type="password" placeholder="password" ref={passwordRef} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
