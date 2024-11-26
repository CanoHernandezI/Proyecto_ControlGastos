import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

import { LoginComponent } from './components/auth/login/login.component';
import { RegistrarseComponent } from './components/auth/registrarse/registrarse.component';
import { HomeComponent } from './components/home/home.component';
import { InicioUsuarioComponent } from './components/inicio-usuario/inicio-usuario.component';
import { GastoFormComponent } from './components/gasto-form/gasto-form.component';
import { GastoListComponent } from './components/gasto-list/gasto-list.component';
import { IngresoFormComponent } from './components/ingreso-form/ingreso-form.component';
import { IngresoListComponent } from './components/ingreso-list/ingreso-list.component';
import { ServicioFormComponent } from './components/servicio-form/servicio-form.component';
import { ServicioListComponent } from './components/servicio-list/servicio-list.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { ResumenComponent } from './components/resumen/resumen.component';
import { SoporteTecnicoComponent } from './components/soporte-tecnico/soporte-tecnico.component';
import { GoogleMapsModule } from '@angular/google-maps';
<<<<<<< HEAD
import { FinanzasComponent } from './components/finanzas/finanzas.component';
import { HttpClientModule } from '@angular/common/http';
=======
import { UbicacionComponent } from './components/ubicacion/ubicacion.component';
import { PaypalComponent } from './components/paypal/paypal.component';
import { TarjetaComponent } from './components/tarjeta/tarjeta.component';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { FinanzasComponent } from './components/finanzas/finanzas.component';
>>>>>>> a015bae7fa6b2bb31b2603ae368cb951e37f9d60
import { SpotifyComponent } from './components/spotify/spotify.component';

registerLocaleData(localeEs, 'es');

@NgModule({ declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        RegistrarseComponent,
        InicioUsuarioComponent,
        GastoFormComponent,
        GastoListComponent,
        IngresoFormComponent,
        IngresoListComponent,
        ServicioFormComponent,
        ServicioListComponent,
        UsuarioComponent,
        ResumenComponent,
        SoporteTecnicoComponent,
<<<<<<< HEAD
        FinanzasComponent,
        SpotifyComponent
=======
        UbicacionComponent,
        PaypalComponent,
        TarjetaComponent,
        SafeUrlPipe,
        FinanzasComponent,
        SpotifyComponent,
>>>>>>> a015bae7fa6b2bb31b2603ae368cb951e37f9d60
    ],
    bootstrap: [AppComponent], 
    
    imports: [BrowserModule,
        HttpClientModule,  // Importa HttpClientModule aquí
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule, GoogleMapsModule],

    providers: [
        { provide: LOCALE_ID, useValue: 'es' },
        provideHttpClient(withFetch()),
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule { }
