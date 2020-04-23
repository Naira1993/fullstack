import { ElementRef } from '@angular/core';

declare var M

export interface MaterialInstance {
  open(),
  close(),
  destroy()
}

export class MaterialService {

  static toast(message: string) {
    M.toast({ html: message })
  }

  static init(ref: any) {
    M.Tabs.init(ref)
  }

  static getInstance(elem): MaterialInstance{
   return M.Sidenav.init(elem, {})
  }

  static updateTextFields() {
    M.updateTextFields()
  }
}