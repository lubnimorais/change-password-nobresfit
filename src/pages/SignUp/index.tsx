// @ts-nocheck
import { FormEvent, useState, useEffect } from "react";

import axios from "axios";
import { useHistory } from "react-router-dom";

import { Input } from "../../components/Input";

import { FieldErrors, signUpValidate } from "../../utils/validations";

import styled from "../../styles/form-plan.module.scss";
import { Select } from "../../components/Select";
import { Spinner } from "../../components/Spinner";

type Objective = {
  id: string;
  name: string;
};

type ValueProps = {
  name: string;
  email: string;
  password: string;
  sex: string;
  birthday: string;
  level: number;
  weight: number;
  height: number;
  goals: string;
};

const SignUp = () => {
  const [fieldError, setFieldError] = useState<FieldErrors>({});
  const [loading, setLoading] = useState(false);
  const [objectives, setObjectives] = useState<Objective[]>([]);
  const [values, setValues] = useState<ValueProps>({} as ValueProps);
  const { push } = useHistory();

  const handleInput = (field: string, value: string) => {
    setValues((s) => ({ ...s, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const errors = signUpValidate(values);

    if (Object.keys(errors).length) {
      setFieldError(errors);
      setLoading(false);
      return;
    }

    setFieldError({});

    try {
      const response = await axios.post("https://api.nobresfit.app/users", {
        name: values.name,
        email: values.email,
        password: values.password,
        sex: values.sex,
        birthday: values.birthday,
        level: Number(values.level),
        weight: Number(values.weight),
        height: Number(values.height),
        goals: [values.goals],
      });

      localStorage.setItem("@userId", response.data.user.user.id);

      push("/checkout");
    } catch (error) {
      alert(
        "Pedimos desculpas pelo inconveniente, por favor tente novamente mais tarde"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    async function getObjectives() {
      const response = await axios.get("https://api.nobresfit.app/objectives");
      setObjectives(response.data.objectives);
    }

    getObjectives();
  }, []);

  useEffect(() => {
    document.title = "Cadastrar Dados";
  }, []);

  return (
    <div className={styled.wrapper}>
      <form className={styled.container} onSubmit={handleSubmit}>
        <h3 className={styled.title}>
          Informe seus dados para finalizar a compra
        </h3>
        <Input
          name="name"
          label="Nome completo"
          placeholder="Nome"
          onInputChange={(value) => handleInput("name", value)}
          error={fieldError?.name}
        />

        <Input
          name="email"
          label="Email"
          placeholder="Email"
          type="email"
          onInputChange={(value) => handleInput("email", value)}
          error={fieldError?.email}
        />
        <div className={styled.row}>
          <Select
            name="sex"
            label="Sexo"
            options={[
              { value: "Masculino", label: "Masculino" },
              { value: "Feminino", label: "Feminino" },
              { value: "Nao Binario", label: "Não Binário" },
              { value: "Nao informado", label: "Prefiro não informar" },
            ]}
            onChange={(value) => handleInput("sex", value)}
            error={fieldError?.sex}
          />

          <Input
            name="birthday"
            label="Data de Nascimento"
            placeholder="Data de Nascimento"
            type="date"
            onInputChange={(value) => handleInput("birthday", value)}
            error={fieldError?.birthday}
          />
        </div>

        <div className={styled.row}>
          <Input
            name="weight"
            label="Peso"
            placeholder="Qual seu peso? EX: 80.5"
            onInputChange={(value) => handleInput("weight", value)}
            error={fieldError?.weight}
          />

          <Input
            name="height"
            label="Altura"
            placeholder="Qual sua altura? EX: 1.80"
            onInputChange={(value) => handleInput("height", value)}
            error={fieldError?.height}
          />
        </div>

        <div className={styled.row}>
          <Select
            label="Escolha seu Nível"
            options={[
              { value: "1", label: "Iniciante" },
              { value: "2", label: "Intermediário" },
              { value: "3", label: "Avançado" },
            ]}
            onChange={(value) => handleInput("level", value)}
            error={fieldError?.level}
          />

          <Select
            label="Selecione seu Objetivo"
            name="goals"
            options={
              objectives.map((objective) => ({
                value: objective.id,
                label: objective.name,
              })) || []
            }
            onChange={(value) => handleInput("goals", value)}
            error={fieldError?.goals}
          />
        </div>

        <Input
          name="password"
          label="Senha"
          type="password"
          placeholder="Informe uma senha"
          onInputChange={(value) => handleInput("password", value)}
          error={fieldError?.password}
        />

        <Input
          name="password_confirmation"
          label="Confirmar Senha"
          type="password"
          placeholder="Confirme sua senha"
          onInputChange={(value) => handleInput("password_confirmation", value)}
          error={fieldError?.password_confirmation}
        />

        <button
          type="button"
          className={styled.submitButton}
          onClick={handleSubmit}
        >
          {loading ? <Spinner /> : "Cadastrar"}
        </button>
      </form>
    </div>
  );
};

export { SignUp };
