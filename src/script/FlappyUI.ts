import { ui } from "../ui/layaMaxUI";
import FlappyControll from "./FlappyControll";
import GameData from "../config/GameData";
/**
 *ui界面
 */
export default class FlappyUI extends ui.flappyUI{
    //游戏控制器
    public controll:FlappyControll;
    //分数
    private _score:number=0;
    public set score(value){
        this._score=value;
    }
    public  addScore(value):void{
        this._score+=value;
    }
    static instance:FlappyUI;
    constructor(){
        super();
        FlappyUI.instance=this;
    }
    onEnable():void{
        //获取控制器
        this.controll=this.getComponent(FlappyControll);
        //显示初始ui
        this.showUI(UIEnum.BEGINUI);
        //1、点击开始
        this.beginStartB.on(Laya.Event.CLICK,this,this.showUI,[UIEnum.TIPSUI]);
        //2、点击提示
        this.tipB.on(Laya.Event.CLICK,this,this.showUI,[UIEnum.START]);
        // 3、游戏进行中
        // 4、游戏结束后的点击开始
        this.reStartB.on(Laya.Event.CLICK,this,this.showUI,[UIEnum.TIPSUI]);
        //加载位图字体
        var bitmap:Laya.BitmapFont = new Laya.BitmapFont();
            bitmap.loadFont("flappy/fonts/flappyfont/flappyfont.fnt",new Laya.Handler(this,this.onFontLoaded,[bitmap]));

        //声音开关
        this.sound.on(Laya.Event.CLICK,this,this._soundSwitch);
    }
    private _soundSwitch():void{
       var t:Laya.Texture= new Laya.Texture();
        if(GameData.instance.isSound){
            GameData.instance.isSound=false;
            Laya.SoundManager.muted=true;//是否静音
            t.load("flappy/10001_2.png");
            
        }else{
            GameData.instance.isSound=true;
            Laya.SoundManager.muted=false;//是否静音
            t.load("flappy/10001_1.png");
        }
        this.sound.texture=t;
    }
    onFontLoaded(bitmap:Laya.BitmapFont):void{
        Laya.Text.registerBitmapFont("flappyfont",bitmap);
        this.currScoreTv.font="flappyfont";
        this.bestScoreTv.font="flappyfont";
        this.currScore.font="flappyfont";
    }
    showUI(cmd):void{
        this._hideUI();
        switch(cmd){
            case UIEnum.BEGINUI:
                this.beginUI.visible=true;
                break;
            case UIEnum.TIPSUI:
                this.tipsUI.visible=true;
                this.controll.createBird();
                break;
            case UIEnum.GAMEOVERUI:
                this.gameoverUI.visible=true;
                this.bestScoreTv.changeText(GameData.instance.getBestScore(this._score/2));
                this.currScoreTv.changeText(this._score/2+"");
                break;
            case UIEnum.START:
                this.currScore.visible=true;
                this.controll.start();
                break;
        }
    }

    //游戏结束
    gameOvers():void{
        this.showUI(UIEnum.GAMEOVERUI);
        this.controll.endGame();
        
    }
    //隐藏所有UI
    private _hideUI():void{
        this.currScore.visible=false;
        this.beginUI.visible=false;
        this.tipsUI.visible=false;
        this.gameoverUI.visible=false;
    }
    //需要实时更新的。。
    upDate():void{
        this.currScore.changeText(this._score/2+"");
        //背景
        this.bg.x-=0.5;
        if(this.bg.x<-640){
            this.bg.x=0;
        }
        //陆地
        this.ground.x-=1;
        if(this.ground.x<-640){
            this.ground.x=0;
        }

    }
}
//场景ui
enum UIEnum{
    BEGINUI,
    TIPSUI,
    START,
    GAMEOVERUI,
}