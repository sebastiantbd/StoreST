import tokenService from '../services/token';
export default {
    verifyUsuario: async (req,res,next) => {
        if (!req.headers.token){
            return res.status(404).send({
                message: 'No token'
            });
        }
        const response=await tokenService.decode(req.headers.token);
        if (response.rol =='Administrador' || response.rol == 'Vendedor' || response.rol=='Almacenero'){
            next();
        } else{
            return res.status(403).send({
                message: 'No autorizado'
            });
        }
    },
    verifyAdministrador: async (req,res,next) => {
        if (!req.headers.token){
            return res.status(404).send({
                message: 'Error: No token'
            });
        }
        const response=await tokenService.decode(req.headers.token);
        if (response.rol =='Administrador'){
            next();
        } else{
            return res.status(403).send({
                message: 'El Usuario No Se Encuentra Autorizado'
            });
        }
    },
    verifyAlmacenero: async (req,res,next) => {
        if (!req.headers.token){
            return res.status(404).send({
                message: 'No se ha generado ningun token correspondiente a este usuario'
            });
        }
        const response=await tokenService.decode(req.headers.token);
        if (response.rol =='Administrador' || response.rol=='Almacenero'){
            next();
        } else{
            return res.status(403).send({
                message: 'El Usuario No Se Encuentra Autorizado'
            });
        }
    },
    verifyVendedor: async (req,res,next) => {
        if (!req.headers.token){
            return res.status(404).send({
                message: 'Error: No token'
            });
        }
        const response=await tokenService.decode(req.headers.token);
        if (response.rol =='Administrador' || response.rol == 'Vendedor'){
            next();
        } else{
            return res.status(403).send({
                message: 'El Usuario No Se Encuentra Autorizado'
            });
        }
    }
}