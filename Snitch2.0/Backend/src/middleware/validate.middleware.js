import { ZodError } from 'zod';

const validate = (schema) => {
  return async (req, res, next) => {
    try {
      const payload = req.body ?? {};
      const parsed = await schema.parseAsync(payload);
      req.body = parsed;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          message: 'validation failed',
          error: error.issues.map((issue) => ({
            failed: issue.path.join('.'),
            message: issue.message,
          })),
        });
      }
      next(error);
    }
  };
};

export default validate;