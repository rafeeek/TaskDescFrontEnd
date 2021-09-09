import { Component, OnInit } from '@angular/core';
import { MeasuresModel } from 'src/app/model/MeasuresModel';
import { MeasureService } from 'src/app/services/Measure.service';
import { ToastrService } from 'ngx-toastr';
declare var $: any;


@Component({
  selector: 'app-Measure',
  templateUrl: './Measure.component.html',
  styleUrls: ['./Measure.component.scss']
})
export class MeasureComponent implements OnInit {
 
  caption?:string;
  DistinctList? : [string];
  MeasuresArray : any;
  targetmodel? : string;
  categoryName? : string;
  AddnewMeasuresArray : object[] = [];
  isSingleClick: Boolean = true;     

  uomeCateg : any ; uomeId : any ; uomeDesc : any ; uomeSysFlg : any ; umcsId : any ; uomkey : any ;


  constructor(public measureService : MeasureService , private toastr: ToastrService) {
    this.getDistincitList();
    localStorage.removeItem("Category");
  }



  getDistincitList() {
    this.measureService.getDistinctList().subscribe(data => {
      this.DistinctList = data;
    });
  }

  getMeasures(text:any){
    this.caption = text.path[0].attributes[1].value;
    this.measuresSubscribe(this.caption);
  };

  measuresSubscribe(caption: any | null) {
    this.measureService.getMeasures(caption).subscribe(data => {
      this.MeasuresArray = data;
    });
  }

  addNewCategory(){
    if (localStorage.getItem("Category") == null) {
      localStorage.setItem("Category" , JSON.stringify(this.categoryName));
      $('#exampleModal').modal('hide');
      this.MeasuresArray = [];
      $(".apendCategory").html("");
      $(".apendCategory").append(`<a class="categoryBtn btn btn-dark w-100 mb-2">${this.categoryName}</a>`);
      $(".categoryBtn").mouseenter(()=>$(".categoryBtn").html("Cancel"))
      $(".categoryBtn").click(()=>this.cancelMeasures())
      $(".categoryBtn").mouseout(()=>$(".categoryBtn").html(`${this.categoryName}`))
    }else{
      alert("You can add one category per once")
    }
  };

  addNewMeasurements(){
     if (localStorage.getItem("Category") !=  null) {
      var Cat : any = localStorage.getItem("Category")
      Cat = JSON.parse(Cat);
      var data = new MeasuresModel(this.uomeCateg , this.uomeId ,this.uomeDesc , Cat ,this.uomeSysFlg , this.umcsId , this.uomkey);
      this.AddnewMeasuresArray.push(data)
      this.MeasuresArray.push(data)
      $('#exampleModal').modal('hide');
     }else{
       alert("Please Add Category First");
     }

  }
   
  openModel(data:any){

    var target = data.path[0].attributes[1].value;
    this.targetmodel = target;
    $('#exampleModal').modal('show');
  };

  sendMeasuresToDatabase(){
    for (const one of this.AddnewMeasuresArray) {
      this.measureService.addNewMeasures(one).subscribe(data=>{
        if (data) this.getDistincitList();
        this.showSuccess(data.Massage)
      })  
    }
    this.cancelMeasures();
    
  };

  cancelMeasures() {
    $(".apendCategory").html("");
    this.MeasuresArray = [];
    this.AddnewMeasuresArray = [];
    localStorage.removeItem("Category");
  }

  UpdateOneMeasure(event:any){
    this.uomeCateg = event.UomeCateg
    this.uomeId = event.UomeId
    this.uomeDesc = event.UomeDesc
    this.uomeSysFlg = event.UomeSysFlg
    this.umcsId = event.UmcsId
    this.uomkey = event.Uomkey

    this.targetmodel = "update";
    $('#exampleModal').modal('show');
  }

  updateMeasureDatabase(){
    var data = new MeasuresModel(this.uomeCateg , this.uomeId ,this.uomeDesc , this.caption ,this.uomeSysFlg , this.umcsId , this.uomkey);
    this.measureService.updateMeasures(data).subscribe(data=>{
      this.showSuccess(data.Massage)
      this.measuresSubscribe(this.caption);
      $('#exampleModal').modal('hide');
    })
  }


  showSuccess(data:string) {
    this.toastr.success('', data ,{timeOut: 2000, progressBar:true , });
  };

  clocseslider(){
    $(".slider").addClass("hide")
    $(".tablecol").removeClass("col-md-7")
    $(".tablecol").addClass("col-md-10")
  }

  CallForClick(obj:object){
    this.isSingleClick = true;
      setTimeout(()=>{
        if(this.isSingleClick){
          $(".tablecol").removeClass("col-md-10")
          $(".tablecol").addClass("col-md-7")
          $(".slider").removeClass("hide")
          $(".titletext").html(`${this.caption}`)

        }
      },250)
 }
  CallForDblClick(event:any){
      this.isSingleClick = false;
      this.UpdateOneMeasure(event)
  }


  
  ngOnInit() {

  }

}
