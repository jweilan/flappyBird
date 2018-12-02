/**
 * 游戏常用信息
 */
export default class GameData{
    static instance:GameData;
    constructor(){
        GameData.instance=this;
        // Laya.LocalStorage.setItem("score","0")
    }
    //分数
    bestScore:number=0;
    //声音开关
    isSound:boolean=true;

    //得到最好的分数
    getBestScore(value:number):string{
       var score=Laya.LocalStorage.getItem("score")
       if(+score>value){
            return score;
       }
       Laya.LocalStorage.setItem("score",value+"");
       return value+"";
    }
}

new GameData();