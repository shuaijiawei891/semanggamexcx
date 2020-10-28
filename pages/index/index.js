//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
   bigarr:[],
   linenum:2.,
   itemwidth:0,
   itemcolor:'rgb(255,0,0)',
   itemopacity: 0.5,
   gametime: 10,
   zhuangtai:false,
   fenshu:0
  },
  initdata(){
    this.setData({
      bigarr:[],
   linenum:2.,
   itemwidth:0,
   itemcolor:'rgb(255,0,0)',
   itemopacity: 0.5,
   gametime: 10,
   zhuangtai:false,
   fenshu:0
    })
  },
  celrandcolor:function(){
    var r = Math.floor(Math.random() *(255-0+1))+0;
    var g = Math.floor(Math.random() *(255-0+1))+0;
    var b = Math.floor(Math.random() *(255-0+1))+0;
    this.setData({
      itemcolor: `rgb(${r},${g},${b})`
    })
    
  },
  celItemwidth:function(){
const windowwidth = wx.getSystemInfoSync().windowWidth; //获取当前屏幕宽度
const shengwidth = windowwidth - (this.data.linenum + 1) * 10;
console.log(shengwidth /  this.data.linenum );

this.setData({
  itemwidth: shengwidth / this.data.linenum 
})
  }, 
  //事件处理函数
  click:function(e){
    if(e.target.dataset.num==0){
      console.log("点对了");
      if (this.data.zhuangtai == false) {
        this.setData({
          zhuangtai: true
        })
  var t = setInterval(() =>{
        this.setData({
          gametime : this.data.gametime - 1
        })
      } ,1000)
      setTimeout(()=>{
       clearInterval(t);      
       wx.showModal({
         title:"游戏结束 是否重来",
         success:(res) =>{
           if(res.confirm){
             this.onLoad();
           }
         }
       })
       
      } , this.data.gametime * 1000)

      }
      this.setData({
        linenum : this.data.linenum < 5 ? this.data.linenum + 1 : this.data.linenum,
        itemopacity : this.data.itemopacity < 0.8 ? this.data.itemopacity + 0.1 : this.data.itemopacity,
        fenshu :this.data.fenshu + 1 
      })
      this.itemshow();
    }  
    else{ 
      console.log("错了");
      this.setData({
        fenshu :this.data.fenshu 
      })
    }
  },
  onLoad: function () {
    this.initdata();
   this.itemshow();
  },
  
  itemshow:function(){
    this.createArr();
    this.celItemwidth();
    this.celrandcolor();
  },
  createArr:function(){
    var linenum= this.data.linenum;
    var arr =[];
    for(var i= 0 ;i < linenum;i++){
      var smallarr =[];
      for(var j = 0 ; j < linenum;j++){
        smallarr.push(1);
      }
      arr.push(smallarr);
    } 
   var bigIndex = Math.floor(Math.random() * (linenum - 0 )) + 0;
   var smallIndex =Math.floor(Math.random() * (linenum - 0 )) + 0;
   arr[bigIndex][smallIndex]= 0;
   this.setData({
      bigarr:arr
    }) 
    
  }
})
