import { jwtDecode } from "jwt-decode"


export const verificaLogado = ()=>{

    const token = localStorage.getItem('token');

    if(!token) return false;

    try{
        const {exp} = jwtDecode(token);

        if(Date.now() >= exp * 1000){
            localStorage.removeItem('token');
            return false;
        }

        return true;
    }catch(error){
        return false;
    }
};

export const getToken = ()=> localStorage.getItem('token');

export const logout = ()=> {
    localStorage.removeItem('token');
}