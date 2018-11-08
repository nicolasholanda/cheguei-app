import { NgModule } from '@angular/core';
import { UserInfoComponent } from './user-info/user-info';
import { CommonModule } from '@angular/common';

@NgModule({
	declarations: [UserInfoComponent],
	imports: [CommonModule],
	exports: [UserInfoComponent]
})
export class ComponentsModule {}
