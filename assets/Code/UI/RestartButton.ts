import { _decorator, Component, Node, director } from 'cc';
import { BlocksPool } from '../Block/BlocksPool';
const { ccclass, property } = _decorator;

@ccclass('RestartButton')
export class RestartButton extends Component {
    public restart() {
        BlocksPool.clearPool();
        director.loadScene(director.getScene().name);
    }
}

