import { instantiate, Prefab, Node, Tween, Vec3 } from "cc";

export class BlocksPool {
    private static pool : Node[] = [];

    public static newBlock(blockPrefab: Prefab) : Node {
        if(this.pool.length < 1) {
            return instantiate(blockPrefab);
        }
        let block: Node = this.pool.pop();
        block.setScale(new Vec3(1, 1, 1));
        block.active = true;
        return block;
    }

    public static destroyBlock(block: Node) {
        block.active = false;
        Tween.stopAllByTarget(block);
        this.pool.push(block);
    }

    public static clearPool() {
        this.pool.length = 0;
    }
}

