import React, { useEffect, useState } from "react";
import Input from "./Input";

const initialFormState = {
    name: '',
    email: '',
    password: '',
}


const UserForm = () => {
    const [form, setForm] = useState(initialFormState);

    const setInput = (newValue) => {
        setForm(form => ({...form, ...newValue}))
    };

    return (
        <>
            <h3>Cadastro</h3>
            <form>
                <div className="form-group">
                    <Input
                        name="name"
                        onChange={e => setInput({ name: e.target.value })}
                        label="Name"
                        value={form.name}
                    />
                </div>
                <div className="form-group">
                    <Input
                        name="email"
                        onChange={e => setInput({ email: e.target.value })}
                        label="E-mail"
                        value={form.email}
                    />
                </div>
                <div className="form-group">
                    <Input
                        name="password"
                        onChange={e => setInput({ password: e.target.value })}
                        label="Senha"
                        value={form.password}
                    />
                </div>

                <div className="form-group mt-1">
                    <button type="button" className="btn btn-primary">Cadastrar</button>
                </div>
            </form>
        </>
    );
}

export default UserForm;