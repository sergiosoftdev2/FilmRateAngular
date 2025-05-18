export class Usuario {

  constructor(nombre: string) {
    this.nombre = nombre;
    this.apellidos = "";
    this.username = "";
    this.email = "";
    this.password = "";
    this.fecha_nacimiento = new Date();
    this.imagen = "";
  }

  nombre: string;
  apellidos: string;
  email: string;
  password: string;
  username: string;
  fecha_nacimiento: Date;
  imagen: string;

  
}