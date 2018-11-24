import React, { useState } from "react";
import cn from "classnames";

import style from "./login-form.scss";
import { Button } from "../button";
import { TextInput } from "../text-input";

interface LoginFormProps {
  className?: string | Object;
  isError?: boolean;
  message?: string;
  verifyLogin: (login: { username: string, password: string }) => any;
  isWarning?: boolean;
}

const LoginForm = ({
  className = null,
  isError = false,
  isWarning = false,
  message = null,
  verifyLogin
}: LoginFormProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className={cn(style.root, className, { [style.error]: !!isError }, { [style.warn]: !!isWarning })}>
      <form
        onSubmit={e => {
          e.preventDefault();
          verifyLogin({ username, password });
        }}
      >
        <div className={style.heading}>Login</div>
        <div className={style.label}>
          <label>
            <span>Username</span>
            <TextInput autocomplete="username" onChange={setUsername} value={username} />
          </label>
        </div>
        <div className={style.label}>
          <label>
            <span>Passwort</span>
            <TextInput autocomplete="current-password" onChange={setPassword} type="password" value={password} />
          </label>
        </div>
        <div className={style.loginButton}>
          <Button className={style.button} submit>
            Login
          </Button>
        </div>
      </form>
      <div className={style.message}>{message && message}</div>
    </div>
  );
};

export default LoginForm;
