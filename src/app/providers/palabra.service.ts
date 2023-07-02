import { Injectable } from '@angular/core';
import { AngularFireDatabase, SnapshotAction } from '@angular/fire/compat/database';
import { Palabra } from '../models/palabra';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PalabraService {

 palabras: any[] =[];

  constructor(private afs: AngularFireDatabase) {

  }
  //muestra contenido del arreglo
  getBD(){
    console.log(this.palabras);
    return this.palabras;
  }

  getConexion(){
      return new Promise( (resolve, reject)=>{
        this.afs.object('palabras/').snapshotChanges().subscribe( (datos: any) => {
        console.log(datos);
        if(datos.payload.exists()){
          resolve(this.palabras = datos.payload.val());
        }else{
          reject(new Error('Ocurrió un problema en BD'));
        }
      });
     });
  }

  //agrega la palabra nueva a la base de datos. 
  updateBD(){
    return this.afs.object('palabras/').set(this.palabras);
  }

  //devuelve un arreglo del tipo palabra
  getArrPalabras(): Palabra[]{
    return this.palabras;
  }

  //agrega la palabra nueva a la base
  agregarPalabra(palabra: string){
    const p = new Palabra(palabra);
    this.palabras.push(p);
    return this.updateBD();
  }

  //obtengo la palabra con el indice indicado
  getPalabraAleatoria(): string{
    const indice = this.funcionAleatorio(this.palabras.length);
    console.log(this.palabras[indice].palabra);
    return this.palabras[indice].palabra;
  }

  //obtengo un numero aleatorio 
  funcionAleatorio(max: number): number{
    return Math.floor(Math.random() * max);
  }


}
