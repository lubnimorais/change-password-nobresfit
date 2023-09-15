import Joi from "joi";

const fieldsValidations = {
  name: Joi.string().required().messages({
    "any.required": "O campo nome é obrigatório",
    "string.empty": "O campo nome é obrigatório",
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "any.required": "O campo e-mail é obrigatório",
      "string.email": "Digite um endereço de e-mail válido",
      "string.empty": "O campo e-mail é obrigatório",
    }),
  sex: Joi.string().required().messages({
    "any.required": "O campo sexo é obrigatório",
    "string.empty": "O campo sexo é obrigatório",
  }),
  birthday: Joi.string().required().messages({
    "any.required": "O campo data de nascimento é obrigatório",
    "string.empty": "O campo data de nascimento é obrigatório",
  }),
  level: Joi.number().required().messages({
    "any.required": "O campo nível é obrigatório",
    "number.base": "O campo nível deve ser um número",
  }),
  weight: Joi.number().required().messages({
    "any.required": "O campo peso é obrigatório",
    "number.base": "O campo peso deve ser um número",
  }),
  height: Joi.number().required().messages({
    "any.required": "O campo altura é obrigatório",
    "number.base": "O campo altura deve ser um número",
  }),
  goals: Joi.string().required().messages({
    "any.required": "O campo objetivo é obrigatório",
    "string.empty": "O campo objetivo é obrigatório",
  }),
  password: Joi.string().min(6).required().messages({
    "any.required": "O campo senha é obrigatório",
    "string.empty": "O campo senha é obrigatório",
    "string.min": "A senha deve ter no mínimo {#limit} caracteres",
  }),
  password_confirmation: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .messages({
      "any.only": "As senhas devem ser iguais",
      "any.required": "O campo confirmar senha é obrigatório",
    }),
};

export type FieldErrors = {
  [key: string]: string;
};

function getFieldErrors(objError: Joi.ValidationResult) {
  const errors: FieldErrors = {};

  if (objError.error) {
    objError.error.details.forEach((err) => {
      errors[err.path.join(".")] = err.message;
    });
  }

  return errors;
}

export function signUpValidate(values: { [key: string]: string | number }) {
  const schema = Joi.object(fieldsValidations);

  return getFieldErrors(schema.validate(values, { abortEarly: false }));
}
