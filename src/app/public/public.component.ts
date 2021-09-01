import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Public } from './shared/public.model';
import { PublicService } from './shared/public.service';

@Component({
	selector: 'public',
	templateUrl: 'public.component.html',
  styleUrls: ['./public.component.scss'],
	providers: [PublicService]
})

export class PublicComponent {

	public!: Public;

	constructor(private publicService: PublicService,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      this.publicService
          .getPublic(id)
          .subscribe(res => {
            this.public = res;
            this.setBackgroundImage(this.public.store.background);
          });

    });
  }

  private setBackgroundImage(imagePath: string): void {
    //document.body.style.backgroundImage = 'url("' + imagePath + '")';
  }

}
