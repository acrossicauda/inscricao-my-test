import React, { useEffect, useState } from "react";
import Input from './../Input';
import {FormValidations} from './../FormValidations';
import { ValidationError} from 'yup';
import swal from 'sweetalert';
import axios from "axios";

const initialFormState = {
    name: '',
    email: '',
    password: '',
}


const api = axios.create({
    baseURL: "http://localhost:8000/usuario",
});

const UserForm = () => {
    const [form, setForm] = useState(initialFormState);
    const [errors, setErrors] = useState({});

    const validate = async () => {
        try {
            await FormValidations.validate(form, { abortEarly: false })
            setErrors({})
        } catch (e) {
            if(e instanceof ValidationError) {
                const errors = {}
                e.inner.forEach((key) => {
                    errors[key.path] = key.message
                })
                setErrors(errors)
            }
        }
    }

    const setInput = (newValue) => {
        setForm(form => ({...form, ...newValue}))
    };



    const sendForm = async () => {
        if(Object.keys(errors).length < 1) {
            var myHeaders = new Headers();
            myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6IkNjUDZYR3VpUUpiL29qNUpwQU90M2c9PSIsInZhbHVlIjoieUMzaFpSeVU1d2EzZ2FwYmY4bGxTemczcWp6aExkWDBTRk9wVHNaa3crcnZBOW5TaGo0blVVVUNiNTVWS3NCWTF5UWdkbHpCL25iVmROSGpTbHJodkxtdFNCcEc4UWhLM0QwTVhxdmgrUlRWOEYrcVVTT0ZBQ3BWU0tVZTJxb08iLCJtYWMiOiJiNDQzZjkwOTlmYTRlNGQ1ZDhjZGVhMWMwNDM3ZDE0NWI3NWU3OWQwNzEwZDA3OWQ4ZWRjODdmZGQzN2JkM2I4IiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6Ikh5MkVrNEZqdlY1NmM1TXJMOFVUUnc9PSIsInZhbHVlIjoiMnJLcnJ1SDVBK0FhcGpPdEV0S1YvTTA4QWpyUWh0dWxOTkdyZjFKaWZuaUExVHpVMnRRSXRuQlE2NVhrTWR6NllkVWtFcFRBbmNodE9LS3FWaGNzVkxkbzJzY3dnM1B0cDB6Z2xCYXkyU1IrbWZDdHZGbzNHWVJNdjlvL0p6TVUiLCJtYWMiOiJlMDI3MzNjZmJhMzQwOWQyNDcyMmIxMDhhMGViM2ViYzViMjk4NjZiNGE0OGFkYjllMmRhOWViMjdmYmYyNmY5IiwidGFnIjoiIn0%3D");

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                redirect: 'follow'
            };

            const params = new URLSearchParams(form);
            console.log(params.toString());
            //fetch("http://localhost:8000/usuario?name=Tiago Sousa&email=acrossicauda@hotmail.com.br&password=123456789", requestOptions)
            fetch("http://localhost:8000/usuario?" + params.toString(), requestOptions)
                .then(response => {
                    console.log(response.text())
                    swal({
                        title: "Cadastro enviado",
                        text: '',//response.text(),
                        icon: "success",
                    });
                })
                .then(result => console.log(result))
                .catch(error => {
                    swal({
                        title: "Erro ao enviar Cadastro!!",
                        text: error,
                        icon: "error",
                    });
                    console.log('error', error)
                });
        }
    }


    useEffect(() => {validate()}, [form])

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
                        error={errors.name}
                    />
                </div>
                <div className="form-group">
                    <Input
                        name="email"
                        onChange={e => setInput({ email: e.target.value })}
                        label="E-mail"
                        value={form.email}
                        error={errors.email}
                    />
                </div>
                <div className="form-group">
                    <Input
                        type="password"
                        name="password"
                        onChange={e => setInput({ password: e.target.value })}
                        label="Senha"
                        value={form.password}
                        error={errors.password}
                    />
                </div>

                <div className="form-group mt-1">
                    <button type="button" className="btn btn-primary" onClick={sendForm}>Cadastrar</button>
                </div>
            </form>
        </>
    );
}

export default UserForm;