import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { YoutubeResponse } from '../models/youtube.models'; // Interfaz dentro de models
import { map } from 'rxjs/operators';

@Injectable({
  // Con esto ya nos importa de manera global nuestro servicio en nuestra aplicación
  providedIn: 'root'
})
export class YoutubeService {

  // Nuestros argumentos
  private youtubeUrl = 'https://www.googleapis.com/youtube/v3';
  private apiKey = 'AIzaSyD7YTrRKKHFiqyYa6ZKYITlSx43cAH-Ejo';
  private playList = 'UUdn5BQ06XqgXoAxIhbqw5Rg';
  private nextPageToken = '';

  constructor(private http: HttpClient) { }

  getVideos() {

    const url = `${this.youtubeUrl}/playlistItems`;
    const params = new HttpParams()
        .set('part', 'snippet')
        .set('maxResults', '10')
        .set('playlistId', this.playList)
        .set('key', this.apiKey)
        // En la 1ra peticion (que no se necesita) mandamos el pageToken pero como esta vacio no hara nada YT, pero en las siguientes si
        .set('pageToken', this.nextPageToken);

    // Definimos ademas que tipo de info regresa <>
    return this.http.get<YoutubeResponse>(url, {params})
      // Pasamos el observable por el pipe que nos permite poner observables de tipo rxjs y transformar la data como queramos
      .pipe(
        map( resp => {
          this.nextPageToken = resp.nextPageToken; // Asignamos o establecemos el nextPageToken de la resp a nuestra variable
          // Retornamos de la resp solo los items
          return resp.items;
        }),
        // Recibimos los items
        map( items => {
          // Como esto es un arreglo, lo pasamos por el propio metodo map de los arreglos para extraer la parte que nos interesa
          return items.map( video => video.snippet); // Retornamos un arreglo de solo los snippet o videos
        })
      );
  }
}
