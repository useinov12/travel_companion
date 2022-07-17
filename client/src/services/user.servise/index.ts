import http from '../http-common';


class AccessUserService{
    async getByEmail(email:string){
        try {
            const { data, status } = await http.get<any>(`/users`, { params: { email: email } });
            const { User } = data;
            console.log({ User, status });
            if(User) return { User, status };
            else return {User:null, status:404}
        } catch (error) {
            console.log(error);
            return error;
        }
    }
    async createUser(email:string, name:string){
        console.log({ServiceFRONT:{email, name}})
        try{
            const resp = await http.post<any>(`/users`, { username:name, email:email });
            console.log(resp)
            return resp
        } catch( error ){
            console.log(error)
            return error
        }
    }
}

export default new AccessUserService();