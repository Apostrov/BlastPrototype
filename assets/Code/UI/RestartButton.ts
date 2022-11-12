import { _decorator, Component, Node, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('RestartButton')
export class RestartButton extends Component {
    public restart() {
        director.loadScene(director.getScene().name);
    }
}

