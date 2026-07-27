import {ZodError} from 'zod';

const validate =(schema)=>{
 return async (req, res, next)=>{
   try{
    req.body = await schema.parseAsync(req.body);
    next();
   }catch(error){
    if(error instanceof ZodError){
        return res.status(400).json({
            success:false,
            message:"validation failed",
            error:error.issues.map((issue)=>({
            failed:issue.path.join("."),
            message:issue.message,
            }))
        })
    }
    next(error);
   }
 }
}
export default validate;