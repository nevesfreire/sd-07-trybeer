import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchCheckEmail,fetchRegisterNewUser } from '../services/api';

function RegisterForm() {
    const history = useHistory();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [checkbox, setCheckbox] = useState(false);
    const [password, setPassword] = useState('');
    const [emailTaken, setEmailTaken] = useState(false);

    const isDisable = () => {
        const passwordMinLength = 5;
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        const regLetters = /[A-Za-z]/;
        const validName = regLetters.test(name);
        const validEmail = reg.test(email) && name.length > 11;
        const validPassword = password.length > passwordMinLength;
        if (validEmail && validPassword && validName) {
            return false;
        }
        return true;
    };

    const handleSubmit = async () => {
        const checkEmail = await fetchCheckEmail(email);
        const role = checkbox ? 'admin' : "client";
        if (!checkEmail) {
            const newUser = await fetchRegisterNewUser({
                name, password, email, role,
            });
            if (newUser) {
                role === 'client' && history.push('/products');
                role === 'admin' && history.push('/admin/orders');
            }
        } else {
            setEmailTaken(true);
        }
    }

    return (
        <form className="form">
            <input
                className="name-input"
                data-testid="signup-name"
                type="text"
                name="name"
                id="name-register"
                placeholder="Nome"
                onChange={(event) => setName(event.target.value)}
            />
            <input
                className="form-input"
                data-testid="signup-email"
                type="email"
                name="email"
                id="email-register"
                placeholder="E-mail"
                onChange={(event) => setEmail(event.target.value)}
            />
            <input
                className="form-input"
                data-testid="signup-password"
                type="password"
                name="password"
                id="password-register"
                placeholder="Password"
                onChange={(event) => setPassword(event.target.value)}
            />
            <label for="checkbox-register">
                <input
                    type="checkbox"
                    data-testid="signup-seller"
                    className="checkbox"
                    name="checkbox-register"
                    id="checkbox-register"
                    onChange={() => setCheckbox(!checkbox)}
                // checked="false"
                /> Quero Vender
                </label>
            <button
                className="form-button"
                data-testid="signup-btn"
                type="button"
                disabled={isDisable()}
                onClick={() => handleSubmit()}
            >
                Cadastrar
  </button>
            <h3 hidden={emailTaken}>Já existe um usuário com esse e-mail.</h3>
        </form>
    );
}

export default RegisterForm;