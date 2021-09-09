export class MeasuresModel {
    UomeCateg:string;
    UomeId:string;
    UomeDesc:string;
    UomeCaption:any;
    UomeSysFlg:string;
    UmcsId:string;
    Uomkey:number;


    constructor(UomeCateg : string , UomeId : string , UomeDesc:string, UomeCaption:any , UomeSysFlg:string , UmcsId:string , Uomkey:number){
        this.UomeCateg = UomeCateg;
        this.UomeId = UomeId;
        this.UomeDesc = UomeDesc;
        this.UomeCaption = UomeCaption;
        this.UomeSysFlg = UomeSysFlg;
        this.UmcsId = UmcsId;
        this.Uomkey = Uomkey;
    }
}
