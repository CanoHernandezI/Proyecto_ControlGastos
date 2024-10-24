export interface Usuario{
    IdUsuario?: string;
    Nombre?: string;
    TipoUsuario?: string; //Se define como number para facilitar la interpretacion de si es administrador o usuario normal
    GrupoUsuario?: string;
    ApPaterno?: string;
    ApMaterno?: string;
    NumTelefono?: string;
    Correo?: string;
    FechaNacimiento?: string;
    Usuario?: string;
    Contrasena: string;
}