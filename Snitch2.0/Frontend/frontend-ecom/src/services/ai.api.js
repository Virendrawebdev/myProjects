import axios from 'axios';

export const recommendProducts= async(prompt) =>{
    const response =await axios.post("/api/ai/recommend", {prompt},{
        withCredentials:true,
    })
  return response.data
}