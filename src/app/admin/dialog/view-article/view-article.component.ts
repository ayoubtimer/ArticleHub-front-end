import { Component, Inject, OnInit } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-article',
  templateUrl: './view-article.component.html',
  styleUrls: ['./view-article.component.scss']
})
export class ViewArticleComponent implements OnInit {
 
  article: any;

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any,
    public themeService: ThemeService){}

 
  ngOnInit(): void {
    this.article = this.dialogData.data
  }

 
}
