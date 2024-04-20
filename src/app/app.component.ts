import { AfterViewInit, ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { IframeService } from './shared/services/iframe/iframe.service';
import { StyleManager } from './shared/services/style-manager/style-manager.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  //* --------------------------  Start  -----------------------------------*//

  //* -----------------------  Decorated Methods  --------------------------*//
  @HostListener('document:mousemove')
  @HostListener('document:click')
  @HostListener('document:keydown')
  resetIdleTimeout() {
    //  this.sendMessage('is_idle_active', '*');
  }
  //* -----------------------  Variable Declaration  -----------------------*//
  // baseOrigin: string = 'https://manage.getbiz.app';
  // baseOrigin: string = 'http://localhost:4200';
  isLoaded: boolean = false;
  //* ---------------------------  Constructor  ----------------------------*//
  constructor(
    private _iframeService: IframeService,
    private styleManager: StyleManager,
    private _cdf: ChangeDetectorRef
  ) {}
  //* -------------------------  Lifecycle Hooks  --------------------------*//
  ngOnInit() {
    // this.styleManager.toggleDarkTheme();
    // this._iframeService.getIframeEmit.subscribe((res) => {
    //   this.styleManager.toggleDarkTheme();
    // });

    this._iframeService.sendIframeEmit.subscribe((res) => {
      console.log('Child', res);
    });
  }

  ngAfterViewInit(): void {
    window.addEventListener('message', (e) => {
      let parentData = JSON.parse(JSON.parse(JSON.stringify(e.data)));

      if (e.origin !== 'https://p29.getwow.education') {
        this._iframeService.sendIframeData(parentData);
        this._iframeService.getIframeMessages(parentData);
      }

      // if (e.origin == this.baseOrigin) {
      //   for (const key in parentData) {
      //     if (Object.prototype.hasOwnProperty.call(parentData, key)) {
      //       const value = parentData[key];

      //       localStorage.setItem(key, value);
      //     }
      //   }
      //   this._iframeService.sendIframeData(parentData);

      //   this._iframeService.getIframeMessages(parentData);
      //   this.isLoaded = true;
      //   this._cdf.detectChanges();
      //   // this.sendMessage('Received From Child', e.origin);
      // }
    });

    // Send data to parent message first time
    window.addEventListener('load', (e) => {
      this.sendMessage('Connected Successful.', '*');
      this._cdf.detectChanges();
    });
  }

  ngOnDestroy() {
    localStorage.clear();
  }
  //* ----------------------------  APIs Methods  --------------------------*//

  //* --------------------------  Public methods  --------------------------*//
  sendMessage(body: any, targetOrigin: string) {
    // Make sure you are sending a string, and to stringify JSON
    window.parent.postMessage(JSON.stringify(body), targetOrigin);
  }
  //* ------------------------------ Helper Function -----------------------*//

  //! -------------------------------  End  --------------------------------!//
}
