import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/pages/login/login.component';
import { MainPageComponent } from './components/pages/main-page/main-page.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { BodyComponent } from './components/layout/body/body.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LogoutComponent } from './components/pages/logout/logout.component';
import { SignupComponent } from './components/pages/signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { UserLoginLogoutComponent } from './components/layout/user-login-logout/user-login-logout.component';
import { FormItemComponent } from './components/form/form-item/form-item.component';
import { GameFormComponent } from './components/form/game-form/game-form.component';
import { GameDetailsComponent } from './components/details/game-details/game-details.component';
import { DetailsItemComponent } from './components/details/details-item/details-item.component';
import { DeleteButtonComponent } from './components/table/delete-button/delete-button.component';
import { GameTableComponent } from './components/table/game-table/game-table.component';
import { TableBodyComponent } from './components/table/table-body/table-body.component';
import { TableCountComponent } from './components/table/table-count/table-count.component';
import { TableFooterComponent } from './components/table/table-footer/table-footer.component';
import { TablePaginationComponent } from './components/table/table-pagination/table-pagination.component';
import { SpinnerComponent } from './components/layout/spinner/spinner.component';
import { ToastMessageComponent } from './components/layout/toast-message/toast-message.component';
import { ToastMessageContainerComponent } from './components/layout/toast-message-container/toast-message-container.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainPageComponent,
    HeaderComponent,
    BodyComponent,
    LogoutComponent,
    SignupComponent,
    UserLoginLogoutComponent,
    FormItemComponent,
    GameFormComponent,
    GameDetailsComponent,
    DetailsItemComponent,
    DeleteButtonComponent,
    GameTableComponent,
    TableBodyComponent,
    TableCountComponent,
    TableFooterComponent,
    TablePaginationComponent,
    SpinnerComponent,
    ToastMessageComponent,
    ToastMessageContainerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
