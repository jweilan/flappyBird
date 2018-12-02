import FlappyUI from "./FlappyUI";
/**
 * 小鸟的脚本
 */
export default class BirdScript extends Laya.Script{
    constructor(){
        super();
    }
    private _bridRid:Laya.RigidBody;
    private _owner:Laya.Sprite;
    onEnable():void{
        this._bridRid=this.owner.getComponent(Laya.RigidBody);
        this._bridRid.type="static";
        this._owner=this.owner as Laya.Sprite;
    }
    onTriggerEnter(other:any):void{
        switch(other.owner.name){
            case "ground"://碰到土地
                Laya.SoundManager.playSound("flappy/ground-hit.wav",1);
                break;
            case "pipe"://碰到水管
                Laya.SoundManager.playSound("flappy/pipe-hit.wav",1);
                break;
        }
        FlappyUI.instance.gameOvers();
        this._bridRid.type="static";//变成静态
        Laya.Tween.to(this._owner,{
            y:1136
        },300,null,Laya.Handler.create(this,this._remove));
    }
    private _remove():void{
        this.owner.removeSelf();
    }
    onDestroy():void{
        Laya.Pool.recover("bird",this.owner);
    }
    onStageClick():void{
        if(FlappyUI.instance.controll.state){
            this._bridRid.setVelocity({x:0,y:-10});
            Laya.SoundManager.playSound("flappy/flap.wav",1);
            Laya.Tween.to(this._owner,{
                rotation:-30,
            },50);

        }
    }
    onUpdate():void{
        if(FlappyUI.instance.controll.state){
            if(this._owner.rotation<90){
                this._owner.rotation+=2;
            }
        }      
    }
}