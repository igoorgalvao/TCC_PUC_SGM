import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    indicadorConvid: any;

    constructor(private http: HttpClient) { }

    ngOnInit() {

        this.indicadorConvid = {
            max: 300000,
            min: 0,
            totalHabitante: 300000,
            confirmados: 200000,
            ativos: 30000,
            testados: 280000,
            recuperados: 165000,
            obitos: 5000
        }



    }

    getImages() {
    }

}
