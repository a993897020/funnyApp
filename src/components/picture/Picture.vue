<template>
  <div class="picture">
    <div class="scroll-wrapper" ref="pictureScroll">
      <ul class="list-wrapper">
        <li class="item-wrapper" v-for="(item,index) in this.info" :key="index">
          <div class="header-wrapper">
            <div class="avatar-wrapper">
              <img :src="item.profile_image" alt="">
            </div>
            <div class="nameTime-wrapper">
              <div class="name">{{item.name}}</div>
              <div class="time">{{item.created_at}}</div>
            </div>
          </div>
          <div class="content-wrapper">
            <div class="title">{{item.text}}</div>
            <div class="content" v-if="item.cdn_img"  >
               <img class="img" :src="item.cdn_img" v-image-preview alt="无效图片">
              <video :src="item.video_url" v-if="item.video_url"></video>
            </div>
          </div>
          <div class="rating-wrapper">
            <div class="love">
              <img src="./image/love.png" alt="" @click="addLoveCount(item,index)" v-if="loveI!==index" >
              <img src="./image/clickLove.png" alt="" v-if="loveI==index">
              <div class="loveCount">{{item.love}}</div>
            </div>
            <div class="hate">
              <img src="./image/hate.png" alt="" @click="addHateCount(item,index)" v-if="hateI!==index">
              <img src="./image/clickHate.png" alt="" v-if="hateI==index">
              <div class="hateCount">{{item.hate}}</div>
            </div>
          </div>
        </li>
        <div class="topScroll" v-if="isLoading">{{loadingText}}</div>
      </ul>
    </div>
    <div class="refresh" v-if="scrollY>1000" @click="refreshFn">刷新</div>
    <div class="comeBack" v-if="scrollY>=0" @click="comeBackFn"></div>
  </div>
</template>

<script>
import BScroll from "better-scroll"
export default {
  name: 'picture',
  data () {
    return {
        info:[],
        loveI:-1,
        hateI:-1,
        scrollY:0,
          page:1,
        loadingText:"",
        isLoading:false,
    }
  },
    created(){
        this.http.get("/satinApi?type=3&page=1")
            .then(res=>{
                if(res.data.code=200){
                  this.info=res.data.data;
                }
                console.log(this.info)
            })
            .catch(err=>{
                console.log(err)
            })
            this.$nextTick(()=>{
              this.initScroll();
            })
    },
    methods:{
      initScroll(){
        if(!this.pageScroll){
          this.pageScroll=new BScroll(this.$refs.pictureScroll,{
                scrollY:true,
                click:true,
                probeType:3,
                 scrollbar:true,  //显示滚动条
                pullUpLoad:{     //上滑加载
                  threshold:50
                }
              })
              this.pageScroll.on("scroll",(pos)=>{
                this.scrollY=Math.floor(Math.abs(pos.y))
                // console.log(this.scrollY)
              })
                this.pageScroll.on("pullingUp",()=>{
                this.isLoading=true
                this.loadingText="加载中..."
                setTimeout(() => {
                  this.loadingText="加载完成！！！"
                  this.getData();
                }, 500);
              })
        }else{
          this.pageScroll.refresh();
        }
      },
     addLoveCount(item,index){
              item.love++;
              this.loveI=index
        },
     addHateCount(item,index){
       item.hate++;
       this.hateI=index
     },
     refreshFn(){
       this.http.get("/satinApi?type=3&page=0")
        .then(res=>{
          console.log(res.data)
          if(res.data.code==200){
            this.info=res.data.data;
            this.pageScroll.scrollTo(0,0,500)
          }
        })
        .catch(err=>{
          console.log(err)
        })
     },
      comeBackFn(){
       this.pageScroll.scrollTo(0,0,1000);
     },
     getData(){
       this.page=this.page++
       this.http.get("/satinApi?type=3&page="+this.page)
        .then(res=>{
          if(res.data.code==200){
            let newData=res.data.data;
            newData.forEach(item=>{
              this.info.push(item)
            })
              this.isLoading=false;
            console.log(this.info)
          }else{
            return
          }
        })
        .catch(err=>{
          console.log(err)
        })
     }       
    },
    computed:{
 
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
 .picture{
   .scroll-wrapper{
    width: 100%;
     height: 95%;
     position:fixed;
     overflow: hidden;
     .list-wrapper{
        width: 100%;
      padding: 22px;
     box-sizing:border-box;
       .item-wrapper{
         margin-bottom: 20px;
         border-bottom:1px solid rgba(0, 0, 0, .1);
         .header-wrapper{
           display:flex;
           justify-content:flex-start;
           .avatar-wrapper{
             width: 30px;
             height: 30px;
             margin-right: 10px;
             img{
               width: 100%;
               height:100%;
               border-radius:50%;
             }
           }
           .nameTime-wrapper{
             flex:1;
             display:flex;
             justify-content: space-between;
             margin-top: 10px;
             .name{
               font-size: 14px;
               color: #000;

             }
             .time{
               font-size: 12px;
               color:#666;
               margin-right: 35px;
             }
           }
         }
         .content-wrapper{
           width: 80%;
           .title{
             font-size: 18px;
             color: #000;
             padding: 20px 0px;
           }
           .content{
             width: 100px;
             height: 100px;
             .img{
               width: 100%;
               height: 100%;
               border-radius:10px;
               background-size: 100% 100%;
               background-repeat: no-repeat;
             }
             .active{
               position:fixed;
               left: 0;
               top: 0px;
               width: 100%;
               height: 100%;
               background-size: 100% 10%;
               border-radius:0;
              //  margin-left: -150px;
              //  margin-top: -150px;
              z-index: 99;
             }
           }
         }
         .rating-wrapper{
           display:flex;
           justify-content: flex-end;
           margin-right: 20px;
           .love{
             display:flex;
             justify-content:flex-start;
             img{
               width: 20px;
               height: 20px;
               padding: 0 10px;
             }
             .loveCount{
               font-size: 16px;
               color: #000;
               margin-top: 5px;
             }
           }
           .hate{
             display:flex;
             justify-content:flex-start;
             img{
               width: 25px;
               height: 25px;
               padding: 0 10px;
             }
             .hateCount{
               font-size: 16px;
               color: #000;
               margin-top: 5px;
               margin-right: 10px;
             }
           }
         }
       }
       .topScroll{
        text-align: center;
        font-size: 16px;
        margin: 20px 0;
        width:100%;
        background-color: rgba(0, 0, 0, .1);
      }
     }
   }
   .refresh{
     width: 50px;
     height: 50px;
     border-radius: 50%;
     border:1px solid rgba(0, 0, 0, .5);
     line-height: 50px;
     font-size: 12px;
     text-align: center;
     position:fixed;
     bottom: 10px;
     left: 50%;
     margin-left: -25px;
     transition:500ms linear;
   }
   .refresh:hover{
     background-color: rgba(0, 0, 0, .5);
     border:none;
     color: rgba(255, 255, 255, .8);
   }
   .comeBack{
     width:20px;
     height:20px;
     background-color:#000;
     position:fixed;
     right:20px;
     bottom:20px;
     border-radius:50%;
     z-index:99;
   }
   .comeBack:before{
     border:7px solid transparent;
     border-bottom-color:#fff;
     content:"";
     position:fixed;
     right:23px;
     bottom:27px; 
   }
 }
</style>
