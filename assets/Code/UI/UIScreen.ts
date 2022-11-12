import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('UIScreen')
export class UIScreen extends Component {
    public show() {
        this.node.active = true;
    }

    public hide() {
        this.node.active = false;
    }
}

