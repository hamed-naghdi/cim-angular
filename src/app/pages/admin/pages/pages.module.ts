import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';

import { PagesRoutingModule } from './pages-routing.module';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [ListComponent, EditComponent],
  imports: [HlmButtonDirective, TableModule, CommonModule, PagesRoutingModule],
  exports: [HlmButtonDirective],
})
export class PagesModule {}
