import { Component, ViewChild, OnInit } from '@angular/core';
import { ArticleService } from './article.service';

import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatTable} from '@angular/material';

import { DialogBoxComponent } from './dialog-box/dialog-box.component';

import * as moment from 'moment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ingerencia-front';
  articles: any = [];

  displayedColumns = ['Title', 'Author', 'Created At', 'Delete'];
  dataSource: any;
  
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable,{static:true}) table: MatTable<any>;

  constructor(private dataService: ArticleService, public dialog: MatDialog) {}



  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
}

ngOnInit() {  
  this.renderDataTable(); 
} 

renderDataTable() {  
  this.dataService.getArticles()  
    .subscribe(  
        x => {  
  this.dataSource = new MatTableDataSource();  
  this.dataSource.data = x;  
  console.log(this.dataSource.data);

  




  Object.keys(x).map(function(artNamedIndex){


    
    let art = x[artNamedIndex];
    // do something with art
    
    if(art.title == 'null'){
      art.title = 'Articulo Sin Titulo';
    }

    art.created_at = moment(art.created_at).fromNow();
});

  
  this.dataSource.sort = this.sort; 
  this.dataSource.paginator = this.paginator;  
},  
error => {  
  console.log('There was an error while retrieving Articles!' + error);  
});  
} 

getArticles() {  
  this.dataService.getArticles()
      .subscribe(
            x => console.log(`Observer tiene una respuesta del web Api: ${JSON.stringify(x)}`),
            err => console.error('Observer tiene un error: ' + err),
            () => console.log('Observer tiene una notificación completa')
      ); 
}  

deleteRowData(row_obj){
  this.dataSource = this.dataSource.filter((value,key)=>{
    return value.id != row_obj.id;
  });
}

openDialog(action,obj) {
  obj.action = action;
  

  this.dataService.deleteArticle(obj.id)  
  .subscribe(  
      x => {  
this.dataSource = new MatTableDataSource();  
this.dataSource.data = x;  
console.log(this.dataSource.data);


this.dataSource.sort = this.sort; 
this.dataSource.paginator = this.paginator;  
},  
error => {  
console.log('There was an error while retrieving Articles!' + error);  
});  

  
  const dialogRef = this.dialog.open(DialogBoxComponent, {
    width: '250px',
    data:obj
  });

  dialogRef.afterClosed().subscribe(result => {
      this.deleteRowData(result.data);
    
  });
}

}
