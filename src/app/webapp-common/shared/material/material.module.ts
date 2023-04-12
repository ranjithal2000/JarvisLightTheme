import {NgModule} from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatMenuModule} from '@angular/material/menu';
import {MatChipsModule} from '@angular/material/chips';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
// -----new jarvis---
import {MatBadgeModule} from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
// -----end new jarvis---

@NgModule({
  imports: [
    MatExpansionModule,
    MatDividerModule,
    MatSelectModule,
    MatDialogModule,
    MatTooltipModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatAutocompleteModule,
    MatChipsModule,
    // -----new jarvis---
    MatCardModule,
    MatIconModule,
    MatTabsModule,
    MatBadgeModule
    // -----end new jarvis---
  ],
  exports: [
    MatExpansionModule,
    MatDividerModule,
    MatSelectModule,
    MatDialogModule,
    MatMenuModule,
    MatTooltipModule,
    MatInputModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatSidenavModule,
    MatListModule,
    // -----new jarvis---
    MatCardModule,
    MatIconModule,
    MatTabsModule
    // -----end new jarvis---
  ],
  declarations: []
})
export class SMMaterialModule {
}
