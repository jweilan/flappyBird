import FlappyUI from "./FlappyUI";
/**
 * 水管脚本
 */
export default class PipeScript extends Laya.Script{
    constructor(){
        super();
    }
    private _owner:Laya.Sprite;
    onEnable():void{
        this._owner=this.owner as Laya.Sprite;
    }
    onUpdate():void{
        this._owner.x-=1;
        if(this._owner.x==100){
            FlappyUI.instance.addScore(1);
            Laya.SoundManager.playSound("flappy/score.wav",1);
        }
        if(this._owner.x<=-100){
            this.owner.removeSelf();
        }
    }
}