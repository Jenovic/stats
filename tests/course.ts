import * as Joi from 'joi';
import j2s from 'joi-to-swagger';

export const idSchema = Joi.string()
  .min(36)
  .required();

export const statsSchema = Joi.object({
  uuid: Joi.string()
    .min(36)
    .required(),
  userUuid: Joi.string()
    .min(36)
    .required(),
  courseUuid: Joi.string()
    .min(36)
    .required(),
  totalModulesStudied: Joi.number()
    .integer()
    .min(0)
    .max(15)
    .required(),
  averageScore: Joi.number().required(),
  timeStudied: Joi.number().required(),
});

const schema = j2s(idSchema, statsSchema).swagger;

export default schema;
