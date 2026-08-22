import axios from "axios";

export const loginUser = async (email, password)=>{
    const response = await axios.post("/api/auth/login",{
        email,
        password
    },{
        withCredentials:true
    }
)
return response.data
}
export const registerUser = async ({
    fullName,
    email,
    password,
    confirmPassword,
    role
})=>{
    const response = await axios.post("/api/auth/register",{
        fullName,
    email,
    password,
    confirmPassword,
    role
    },{
        withCredentials:true
    }
)
return response.data
}


export const getCurrentUser = async()=>{
    const response= await axios.get("/api/auth/me",{
        withCredentials:true,
    })
    return response.data
}