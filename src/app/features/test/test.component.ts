import { Component, OnInit } from '@angular/core';
import * as LeaderLine from 'leader-line-new';

@Component({
  selector: 'sm-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    window.onload = () => {
      const table1 = document.getElementById("table1");
      const table2 = document.getElementById("table2");
      const table3 = document.getElementById("table3");
      const table4 = document.getElementById("table4");
      const table5 = document.getElementById("table5");
      const element2 = document.getElementById("element2") as HTMLInputElement;
      


      function createArrow(from, to, yOffset) {
        return new LeaderLine(
          LeaderLine.pointAnchor(from, { x: '100%', y: `calc(50% + ${yOffset}px)` }),
          LeaderLine.pointAnchor(to, { x: 0, y: `calc(50% + ${yOffset}px)` }),
          {
            color: 'black',
            size: 2,
            startSocket: 'right',
            endSocket: 'left',
            startPlug: 'behind',
            endPlug: 'arrow2',
            endPlugSize: 1.5,
            path: 'fluid',
            dash: { animation: true },
          }
        );
      }

      const rows1 = table1.querySelectorAll("div");
      const rows2 = table2.querySelectorAll("div");
      const rows3 = table3.querySelectorAll("div");
      const rows4 = table4.querySelectorAll("div");
      const rows5 = table5.querySelectorAll("div");

    
      let arrowLink2;
      let arrowLink3;
      let arrowLink4;
      let arrowLink5;
      let arrowLink6;

      const updateArrows = () => {
        if (element2.checked && !arrowLink2) {
          arrowLink2 = createArrow(rows1[0].querySelector("mat-expansion-panel"), rows2[0].querySelector("mat-expansion-panel"), 5);
        } else if (!element2.checked && arrowLink2) {
          arrowLink2.remove();
          arrowLink2 = null;
        }
        if (element2.checked && !arrowLink4) {
          arrowLink4 = createArrow(rows2[0].querySelector("mat-expansion-panel"), rows3[0].querySelector("mat-expansion-panel"), 5);
        } else if (!element2.checked && arrowLink4) {
          arrowLink4.remove();
          arrowLink4 = null;
        }
        if (element2.checked && !arrowLink5) {
          arrowLink5 = createArrow(rows3[0].querySelector("mat-expansion-panel"), rows4[1].querySelector("mat-expansion-panel"), 10);
        } else if (!element2.checked && arrowLink6) {
          arrowLink5.remove();
          arrowLink5 = null;
        }
        if (element2.checked && !arrowLink6) {
          arrowLink6 = createArrow(rows4[0].querySelector("mat-expansion-panel"), rows5[0].querySelector("mat-expansion-panel"), 5);
          // arrowLink3 = createArrow(rows3[0].querySelector("td"), rows4[1].querySelector("td"), 5);
        } else if (!element2.checked && arrowLink6 && arrowLink3) {
          arrowLink6.remove();
          // arrowLink3.remove();
          arrowLink6 = null;
          // arrowLink3 = null;
        }
      }

      element2.addEventListener("change", updateArrows);
     
    };
  }


   createArrow(from, to, yOffset) {
    return new LeaderLine(
      LeaderLine.pointAnchor(from, { x: '100%', y: `calc(50% + ${yOffset}px)` }),
      LeaderLine.pointAnchor(to, { x: 0, y: `calc(50% + ${yOffset}px)` }),
      {
        color: 'black',
        size: 2,
        startSocket: 'right',
        endSocket: 'left',
        startPlug: 'behind',
        endPlug: 'arrow2',
        endPlugSize: 1.5,
        path: 'fluid',
        dash: { animation: true },
      }
    );
  }
  

  // create(data:any){
  //   debugger
    
   
  // }
  updateArrows(data:any){
    const table1 = document.getElementById("table1");
    const table2 = document.getElementById("table2");
    const table3 = document.getElementById("table3");
    const table4 = document.getElementById("table4");
    const table5 = document.getElementById("table5");
    const element2 = document.getElementById("element2") as HTMLInputElement;

    const rows1 = table1.querySelectorAll("div");
      const rows2 = table2.querySelectorAll("div");
      const rows3 = table3.querySelectorAll("div");
      const rows4 = table4.querySelectorAll("div");
      const rows5 = table5.querySelectorAll("div");

    
      let arrowLink2;
      let arrowLink3;
      let arrowLink4;
      let arrowLink5;
      let arrowLink6;

    if (data=='clicked' && !arrowLink2) {
      arrowLink2 = this.createArrow(rows1[0].querySelector("mat-expansion-panel"), rows2[0].querySelector("mat-expansion-panel"), 10);
    } else if (!element2.checked && arrowLink2) {
      arrowLink2.remove();
      arrowLink2 = null;
    }
    if (data=='clicked' && !arrowLink4) {
      arrowLink4 = this.createArrow(rows2[0].querySelector("mat-expansion-panel"), rows3[0].querySelector("mat-expansion-panel"), 10);
    } else if (!element2.checked && arrowLink4) {
      arrowLink4.remove();
      arrowLink4 = null;
    }
    if (data=='clicked' && !arrowLink5) {
      arrowLink5 = this.createArrow(rows3[0].querySelector("mat-expansion-panel"), rows4[1].querySelector("mat-expansion-panel"), 10);
    } else if (!element2.checked && arrowLink6) {
      arrowLink5.remove();
      arrowLink5 = null;
    }
    if (data=='clicked' && !arrowLink6) {
      arrowLink6 = this.createArrow(rows4[0].querySelector("mat-expansion-panel"), rows5[0].querySelector("mat-expansion-panel"), 5);
      // arrowLink3 = createArrow(rows3[0].querySelector("td"), rows4[1].querySelector("td"), 5);
    } else if (!element2.checked && arrowLink6 && arrowLink3) {
      arrowLink6.remove();
      // arrowLink3.remove();
      arrowLink6 = null;
      // arrowLink3 = null;
    }
  }

  
}
