/**This class is automatically generated by LayaAirIDE, please do not make any modifications. */
import View=Laya.View;
import Dialog=Laya.Dialog;
import Scene=Laya.Scene;
export module ui {
    export class flappyUI extends Scene {
		public bg:Laya.Sprite;
		public ground:Laya.Sprite;
		public beginUI:Laya.Sprite;
		public beginStartB:Laya.Sprite;
		public tipsUI:Laya.Sprite;
		public tipB:Laya.Sprite;
		public gameoverUI:Laya.Sprite;
		public reStartB:Laya.Sprite;
		public bestScoreTv:laya.display.Text;
		public currScoreTv:laya.display.Text;
		public currScore:laya.display.Text;
		public sound:Laya.Sprite;
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.loadScene("flappy");
        }
    }
}