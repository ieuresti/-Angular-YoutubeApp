import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../../services/youtube.service';
import { Video } from '../../models/youtube.models';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // Propiedad que alojara todos los videos
  videos: Video[] = [];

  constructor(private youtubeService: YoutubeService) { }

  ngOnInit() {

    this.cargarVideos();

  }

  cargarVideos() {

    this.youtubeService.getVideos()
    .subscribe( resp => {
      // El operador spread se va a encargar de tomar c/u de las propiedades resp de la resp y crearse una propiedad con el mismo nombre
      this.videos.push(...resp); // Agregamos al arreglo
      console.log(this.videos);
    });
  }

  mostrarVideo(video: Video) {

    console.log(video);
    Swal.fire({
      html: `
      <h4>${video.title}</h4>
      <hr>
      <iframe width="100%"
              height="315"
              src="https://www.youtube.com/embed/${video.resourceId.videoId}"
              frameborder="0"
              allow="accelerometer;
              autoplay;
              clipboard-write;
              encrypted-media;
              gyroscope;
              picture-in-picture"
              allowfullscreen>
      </iframe>
      `
    });
  }

}
