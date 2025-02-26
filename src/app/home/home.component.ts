import { Component } from '@angular/core';
import { ThemeService } from '../services/theme.service';
import { ArticleService } from '../services/article.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SnackbarService } from '../services/snackbar.service';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { GloablConstants } from '../shared/global-constants';
import { ArticleComponent } from '../admin/dialog/article/article.component';
import { ArticleDetailsComponent } from '../article-details/article-details.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  responseMessage: any;
  articles: any;
  searchText: string = '';

  constructor(
    public themeService: ThemeService,
    private articleService: ArticleService,
    private dialog: MatDialog,
    private snackBarService: SnackbarService,
    private router: Router,
    private ngxService: NgxUiLoaderService
  ) {
    this.ngxService.start();
    this.tableData();
  }

  tableData() {
    this.articleService.getAllPublishedArticle().subscribe(
      (response: any) => {
        this.articles = response;
        this.ngxService.stop();
      },
      (error: any) => {
        this.ngxService.stop();
        console.log(error);
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = GloablConstants.genericError;
        }
        this.snackBarService.openSnackBar(this.responseMessage);
      }
    );
  }
  filteredItems(): any{
    return this.articles?.filter(item =>
      item.title.toLowerCase().includes(this.searchText.toLowerCase()) ||
      item.categoryName.toLowerCase().includes(this.searchText.toLowerCase()));
  }
  
  handleViewAction(values: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Edit',
      data: values,
    };
    dialogConfig.width = '850px';
    const dialogRef = this.dialog.open(ArticleDetailsComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });
  }




  changeTheme(color: any) {
    this.themeService.setTheme(color);
  }
}
