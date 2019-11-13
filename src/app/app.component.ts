import { Component, ViewChild, OnInit, ViewEncapsulation, ElementRef } from '@angular/core';
import { FileManager, MenuOpenEventArgs, MenuClickEventArgs } from '@syncfusion/ej2-filemanager';
import {
  DocumentEditorComponent, PrintService, SfdtExportService, WordExportService, TextExportService, SelectionService,
  SearchService, EditorService, ImageResizerService, EditorHistoryService, ContextMenuService,
  OptionsPaneService, HyperlinkDialogService, TableDialogService, BookmarkDialogService, TableOfContentsDialogService,
  PageSetupDialogService, StyleDialogService, ListDialogService, ParagraphDialogService, BulletsAndNumberingDialogService,
  FontDialogService, TablePropertiesDialogService, BordersAndShadingDialogService, TableOptionsDialogService,
  CellOptionsDialogService, StylesDialogService, DocumentEditorContainerComponent
} from '@syncfusion/ej2-angular-documenteditor';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [PrintService, SfdtExportService, WordExportService, TextExportService, SelectionService, SearchService, EditorService,
    ImageResizerService, EditorHistoryService, ContextMenuService, OptionsPaneService, HyperlinkDialogService, TableDialogService,
    BookmarkDialogService, TableOfContentsDialogService, PageSetupDialogService, StyleDialogService, ListDialogService,
    ParagraphDialogService, BulletsAndNumberingDialogService, FontDialogService, TablePropertiesDialogService,
    BordersAndShadingDialogService, TableOptionsDialogService, CellOptionsDialogService, StylesDialogService]
})

export class AppComponent implements OnInit {
  title = 'syncfusion-sandbox';

  public hostUrl = 'http://localhost:62869/';
  // filemanager
  @ViewChild('filemanagerDefault', { static: false }) filemanagerDefault: FileManager;
  public view: string;
  public detailsViewSettings: object;
  public navigationPaneSettings: object;
  public ajaxSettings: object;
  public contextMenuSettings: object;
  public toolbarSettings: object;
  public uploadSettings: object;
  public enablePersistence: boolean;
  public showFileExtension: boolean;
  public showThumbnail: boolean;

  // document editor
  // @ViewChild('documentEditorDefault', { read: ElementRef, static: true }) public documentEditorDefault: DocumentEditorComponent;
  // tslint:disable-next-line:variable-name
  @ViewChild('documentEditorDefault', { static: true }) documentEditorDefault: ElementRef<DocumentEditorContainerComponent>;
  public container: DocumentEditorContainerComponent;
  public documentServiceLink: string;
  public showDocument = false;

  constructor(
    private http: HttpClient) {
  }

  public ngOnInit(): void {
    this.setUpFileManagerDefaults();
    this.setUpDocumentEditorDefaults();
  }

  setUpFileManagerDefaults() {
    this.ajaxSettings = {
      url: this.hostUrl + 'api/AzureProvider/AzureFileOperations',
      getImageUrl: this.hostUrl + 'api/AzureProvider/AzureGetImage',
      uploadUrl: this.hostUrl + 'api/AzureProvider/AzureUpload',
      downloadUrl: this.hostUrl + 'api/AzureProvider/AzureDownload'
    };

    this.contextMenuSettings = {
      file: ['Open', '|', 'Delete', 'Rename', '|', 'Details'],
      folder: ['Open', '|', 'Delete', 'Rename', '|', 'Details'],
      layout: ['SortBy', 'View', 'Refresh', '|', 'NewFolder', 'Upload', '|', 'Details', '|', 'SelectAll'],
      visible: true
    };

    this.detailsViewSettings = {
      columns: [
        // tslint:disable-next-line:max-line-length
        { field: 'name', headerText: 'File Name', minWidth: 120, width: 'auto', customAttributes: { class: 'e-fe-grid-name' }, template: '${name}' },
        { field: 'size', headerText: 'File Size', minWidth: 50, width: '110', template: '${size}' },
        { field: '_fm_modified', headerText: 'Date Modified', minWidth: 50, width: '190' }
      ]
    };

    this.navigationPaneSettings = {
      maxWidth: '850px',
      minWidth: '140px',
      visible: true
    };

    this.toolbarSettings = {
      items: ['NewFolder', 'Upload', 'Refresh', 'Details', 'View'],
      visible: true
    };

    this.uploadSettings = {
      maxFileSize: 1048576, // 1MB
      minFileSize: 120,
      autoUpload: true,
      allowedExtensions: '.doc, .docx, .xls, .xlsx, .pdf, .jpg, .jpeg, .png, .gif'
    };

    this.view = 'Details';
    this.enablePersistence = true;
    this.showFileExtension = true;
    this.showThumbnail = true;
  }

  setUpDocumentEditorDefaults() {
    this.documentServiceLink = this.hostUrl + 'api/DocumentEditor';
  }

  onFileManagerCreate(args: any) {
    console.log('File Manager has been created successfully');
  }

  menuOpen(args: MenuOpenEventArgs) {
    for (const item of args.items) {
      if (item.text === 'Custom') {
        item.iconCss = 'e-icons e-fe-tick';
        break;
      }
    }
  }

  // event for custom menu item
  menuClick(args: MenuClickEventArgs) {
    const fileDetails = new Array<any>();
    fileDetails.push(args.fileDetails[0]);

    if (args.item.text === 'Open' && fileDetails[0].type !== 'Directory') {
      // tslint:disable-next-line:max-line-length
      const baseUrl = this.documentServiceLink + '/ImportFile?fileNameAndLocation=' + this.filemanagerDefault.pathNames.join('/') + '/' + fileDetails[0].name;
      const self = this;

      this.http.get(baseUrl)
        .subscribe((document) => {
          console.log(document);
          this.showDocument = true;
          this.container.documentEditor.open(JSON.stringify(document));
        });
    }
  }
}
