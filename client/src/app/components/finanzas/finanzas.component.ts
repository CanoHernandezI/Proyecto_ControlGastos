import { Component, OnInit } from '@angular/core';
import { PresupuestosService } from '../../services/presupuestos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { FinancesService } from '../../services/finances.service';

@Component({
  selector: 'app-finanzas',
  templateUrl: './finanzas.component.html',
  styleUrl: './finanzas.component.css'
})  
export class FinanzasComponent implements OnInit {
  notificationMessage: string | null = null;
  idUsuario: string | null = null;
  presupuestos: any = [];
  stockData: any; // Almacena los datos de la acción para la API de Finnhub
  ticker: string = ''; // Cambia este valor según el ticker que desees consultar para la API de Finnhub
  loading: boolean = false; // Para manejar el estado de carga para la API de Finnhub
  errorMessage: string = ''; // Mensaje de error para la API de Finnhub
  recommendations: any; //Para las recomendaciones del mercado API Finnhub
  companyNews: any;  //Para la compania de la que se desea ver la noticias 
  searchPerformed: boolean = false; //Verifica si ya se busco una accion
  receiveMessage: any;

  constructor(
    private presupuestosService: PresupuestosService,
    private router: Router,
    private notificationService: NotificationService,
    private stockService: FinancesService, //Servicio de finhub (finanzas).
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    window.addEventListener('message', this.receiveMessage.bind(this), false);
    this.idUsuario = localStorage.getItem('IdUsuario');
    if (this.idUsuario) {
      this.loadPresupuestos();
    } else {
      console.error('Usuario no autenticado');
      this.router.navigate(['/login']);
    }

    this.notificationService.notification$.subscribe(message => {
      this.notificationMessage = message;
    });

    this.fetchStockData(this.ticker); // Llama a la función al iniciar el componente para datos de acciones de Finnhub
    this.fetchRecommendationTrends(this.ticker); //Recomendaciones de finhub

     // Obtener la fecha actual y una fecha anterior (por ejemplo, una semana antes)
    const today = new Date();
    const lastWeek = new Date();
    lastWeek.setDate(today.getDate() - 7); // Fecha de hace 7 días

    // Convierte las fechas a formato 'YYYY-MM-DD'
    const todayStr = today.toISOString().split('T')[0];
    const lastWeekStr = lastWeek.toISOString().split('T')[0];

    // Llama al método de noticias de la compañía con las fechas
    this.fetchRecentCompanyNews(this.ticker);
  }

  loadPresupuestos() {
    if (this.idUsuario) {
      this.presupuestosService.getPresupuestos(this.idUsuario).subscribe(
        (resp: any) => {
          this.presupuestos = resp;
        },
        err => console.log(err)
      );
    }
  }

  // Método para manejar el envío del formulario
  onSubmit() {
    if (this.ticker) {
      this.fetchStockData(this.ticker); // Consultar datos de la acción
      this.fetchRecommendationTrends(this.ticker); // Consultar recomendaciones
      this.fetchRecentCompanyNews(this.ticker); // Consultar noticias recientes
      this.searchPerformed = true; // Indicar que se ha realizado una búsqueda
    }
  }

 // Método para obtener datos de acciones usando Finnhub
 fetchStockData(ticker: string) {
  this.loading = true; // Establece el estado de carga
  this.errorMessage = ''; // Reinicia el mensaje de error

  this.stockService.getStockData(ticker).subscribe(
    (data: any) => {
      this.stockData = data; // Asigna los datos de la acción obtenidos
      this.loading = false; // Desactiva el estado de carga
    },
    (error) => {
      this.errorMessage = error; // Muestra el mensaje de error
      this.loading = false; // Desactiva el estado de carga
    }
  );
}

// Metodo para las recomendaciones de mercado
fetchRecommendationTrends(ticker: string) {
  this.loading = true;
  this.stockService.getRecommendationTrends(ticker).subscribe(
    (recommendations: any) => {
      this.recommendations = recommendations;
      this.loading = false;
    },
    (error) => {
      this.errorMessage = error;
      this.loading = false;
    }
  );
}  

//Metodo para las noticias más recientes de empresas
fetchRecentCompanyNews(ticker: string) {
  this.loading = true;
  this.stockService.getRecentCompanyNews(ticker).subscribe(
    (news: any) => {
      this.companyNews = news;
      this.loading = false;
    },
    (error) => {
      this.errorMessage = error;
      this.loading = false;
    }
  );
}
}