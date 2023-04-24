import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MoveDirection, ClickMode, HoverMode, OutMode, Container, Engine } from "tsparticles-engine";
import { loadFull } from "tsparticles";


@Component({
  selector: 'sm-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss']
})
export class SplashScreenComponent implements OnInit {

  
  title = "CodeSandbox";
  id = "tsparticles";
  windowWidth: string;
  showSplash = true;
  /* Starting from 1.19.0 you can use a remote url (AJAX request) to a JSON with the configuration */ 
  particlesUrl = "http://foo.bar/particles.json";
   /* or the classic JavaScript object */ 
  
   particlesOptions = 
   {
     
      background: 
     { 
       color: { 
         value: "#fff",
          }, 
         
         }, 
        
         fpsLimit: 150, 
         interactivity: 
         { events:
            { onClick:
              { enable: true, 
               mode: ClickMode.push, 
             }, 
             onHover: 
             { enable: true, 
               mode: HoverMode.repulse, 
             }, 
             resize: true, 
           }, 
           modes: 
           { 
             push: { quantity: 4, }, 
             repulse: { 
               distance: 200, duration: 0.8, 
             }, 
           }, 
         }, 
         particles: 
         { color: 
           { 
             value: "#7672ED", 
           }, 
           
           links: 
           { 
             color: "#7672ED", 
             distance: 150, 
             enable: true, 
             opacity: 0.5, 
             width: 1, 
           }, 
           collisions: 
           { 
             enable: true, 
           }, 
         
           move: 
           { 
             direction: MoveDirection.none, 
             enable: true, 
             outModes: 
             { 
               default: OutMode.bounce, 
             }, 
             random: false, 
             speed: 1, 
             straight: false, 
           }, 
           number: 
           { 
             density: 
             { 
               enable: true, 
               area: 800, 
             }, 
             value: 80, 
           }, 
           opacity: 
           { 
             value: 0.5, 
           }, 
           shape: 
           { 
             type: "circle", 
           }, 
           size: 
           { 
             value: 
             { 
               min: 1, 
               max: 5 
             }, 
           }, 
         }, 
         detectRetina: true, 
       }; 
       particlesLoaded(container: Container): void { console.log(container); } 
       async particlesInit(engine: Engine): Promise<void> { console.log(engine);
          // Starting from 1.19.0 you can add custom presets or shape here, using the current tsParticles instance (main) 
          // this loads the tsparticles package bundle, it's the easiest method for getting everything ready 
          // starting from v2 you can add only the features you need reducing the bundle size 
          await loadFull(engine); 
         }

  constructor(private router: Router) { }
  
  ngOnInit(): void {
    setTimeout(() => {
      this.windowWidth = "-" + window.innerWidth + "px";

      setTimeout(() => {
        this.router.navigateByUrl("/test")
        this.showSplash = !this.showSplash;
      }, 800);
    }, 2600);
   }
    
}