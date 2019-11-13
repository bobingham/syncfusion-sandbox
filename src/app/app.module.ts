import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Imported syncfusion filemanager module from filemanager package
import { FileManagerModule, NavigationPaneService, ToolbarService, DetailsViewService } from '@syncfusion/ej2-angular-filemanager';
// import the DocumentEditorModule for the DocumentEditor component
import { DocumentEditorAllModule, DocumentEditorContainerAllModule } from '@syncfusion/ej2-angular-documenteditor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

    // Registering EJ2 filemanager Module
    FileManagerModule,
    // declaration of ej2-angular-documenteditor module into NgModule
    DocumentEditorAllModule,
    DocumentEditorContainerAllModule
  ],
  providers: [
    NavigationPaneService,
    ToolbarService,
    DetailsViewService],
  bootstrap: [AppComponent]
})
export class AppModule { }
