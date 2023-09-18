import {
  EMAIL_PATTERN,
  FRENCH_PATTERN,
  PASSWORD_PATTERN,
  PHONE_PATTERN,
} from "./patterns";

export const API_URL = "http://localhost:8000/api/v1";
export const API_AUTH_URL = "http://localhost:8000/auth/v1";

export const requiredRule = {
  required: { value: true, message: "Obligatoire*" },
};
export const latitudeRule = {
  ...requiredRule,
  min: { value: -90, message: "minimum -90*" },
  max: { value: 90, message: "maximum 90*" },
};

export const longitudeRule = {
  ...requiredRule,
  min: {
    value: -180,
    message: "minimum -180*",
  },
  max: {
    value: 180,
    message: "maximum 180*",
  },
};

export const emailRule = {
  ...requiredRule,
  pattern: {
    value: EMAIL_PATTERN,
    message: "email malformé*",
  },
};

export const phoneRule = {
  ...requiredRule,
  pattern: { value: PHONE_PATTERN, message: "telephone malformé*" },
};

export const passwordRule = {
  ...requiredRule,
  pattern: {
    value: PASSWORD_PATTERN,
    message: "doit avoir en moins une majuscule, une miniscule et un chiffre*",
  },
  minLength: {
    value: 8,
    message: "longeur superieure a 8*",
  },
};

export const frenchRule = {
  pattern: { value: FRENCH_PATTERN, message: "En français" },
};

export const BAR_CODE_SIZE = 8;
