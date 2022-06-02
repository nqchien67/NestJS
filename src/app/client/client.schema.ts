export const loginSchema: AjvSchema = {
  type: 'object',
  required: ['email', 'password'],
  additionalProperties: false,
  properties: {
    email: {
      format: 'email',
      type: 'string',
    },
    password: {
      type: 'string',
      minLength: 6,
      maxLength: 15,
    },
  },
};

export const registerSchema: AjvSchema = {
  type: 'object',
  required: ['email', 'password', 'code'],
  additionalProperties: false,
  properties: {
    email: {
      format: 'email',
      type: 'string',
    },
    password: {
      type: 'string',
      minLength: 6,
      maxLength: 15,
    },
    code: {
      type: 'string',
      minLength: 5,
      maxLength: 5,
    },
  },
};
