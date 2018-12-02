import FlappyUI from "./FlappyUI";
/**
 * 游戏流程控制脚本
 */
export default class FlappyControll extends Laya.Script{

    /** @prop {name:Brid,tips:"小鸟",type:Prefab} */
    Brid:Laya.Prefab;
     /** @prop {name:Pipe,tips:"水管预制件",type:Prefab} */
    Pipe:Laya.Prefab;
     /** @prop {name:interval,tips:"间隔多久产生水管"} */
    public interval:number=3000; 
    /** 上下水管距离 */
    public diffcult:number=250; 

    //开始时间
    private _time:number=0;
    // 游戏容器
    private _GameBox:Laya.Sprite;
    // 水管容器
    private _pipeBox:any=[];
    //游戏状态
    private _state:boolean=false;
    public get state():boolean{
        return this._state;
    }
    //小鸟
    private _birdObj:Laya.Sprite;
    //开始游戏
    start():void{
        this._reset();
        this._state=true;
        this._birdObj.getComponent(Laya.RigidBody).type="dynamic";
    }
    //游戏结束
    endGame():void{
        this._reset();
        this._state=false;
    }
    constructor(){
        super();
    }
    onEnable():void{
        this._GameBox=this.owner.getChildByName("gameBox") as Laya.Sprite;
    }
    //生成水管。。
    private _createPipe():void{
        var position:number=Math.floor(Math.random()*this.diffcult);
        var topY:number=-position,
            bottomY=+this.diffcult+(450-position);
        console.log(topY,bottomY);
        var pipe1:Laya.Sprite=Laya.Pool.getItemByCreateFun("pipe",this.Pipe.create,this.Pipe),
            pipe2:Laya.Sprite=Laya.Pool.getItemByCreateFun("pipe",this.Pipe.create,this.Pipe);
        
        pipe1.pos(640,topY);
        pipe2.pos(640,bottomY);

        var top:Laya.Sprite=pipe1.getChildByName("top") as Laya.Sprite;
            top.visible=true;
        var bottom:Laya.Sprite = pipe2.getChildByName("bottom") as Laya.Sprite;
            bottom.visible=true;

        this._pipeBox.push(pipe1);
        this._pipeBox.push(pipe2);
        this._GameBox.addChild(pipe1)
        this._GameBox.addChild(pipe2);
    }
    //生成小鸟
    public createBird():void{
        var bird:Laya.Sprite=Laya.Pool.getItemByCreateFun("bird",this.Brid.create,this.Brid);
        bird.pos(100,300);
        this._birdObj=bird;
        this._GameBox.addChild(bird);
    }
    //重置
    private _reset():void{
        for(var i=0;i<this._pipeBox.length;i++){
            this._GameBox.removeChild(this._pipeBox[i]);
        }
        this._pipeBox=[];//清空水管
        FlappyUI.instance.score=0;//清空分数
    }
    onUpdate():void{
        if(this._state){//游戏状态为true即开始
            let now = Date.now();
            if(now - this._time>this.interval){
                this._time=now;
                this._createPipe();
            }
            //更新UI
            FlappyUI.instance.upDate();
        }
    }
}