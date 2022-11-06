import { Vec2 } from "cc";
import { Block, BlockColor } from "../Block";

export class FieldBlastSolver {
    public static dfsBlastSolve(startBlock: Block, field: Block[][]): Block[] {
        let toBlast: Block[] = [];
        let dfsStack: Vec2[] = [];
        let discoverd: boolean[][] = new Array(field.length)
            .fill(false)
            .map(() =>
                new Array(field[0].length).fill(false)
            );
        let color: BlockColor = startBlock.getColor();

        dfsStack.push(startBlock.getIndex());
        while (dfsStack.length > 0) {
            let index: Vec2 = dfsStack.pop();

            if (index.x < 0 || index.y < 0 ||
                index.x >= field.length || index.y >= field[index.x].length ||
                discoverd[index.x][index.y] || field[index.x][index.y]?.getColor() != color) {
                continue;
            }

            toBlast.push(field[index.x][index.y]);
            discoverd[index.x][index.y] = true
            dfsStack.push(new Vec2(index.x + 1, index.y));
            dfsStack.push(new Vec2(index.x, index.y + 1));
            dfsStack.push(new Vec2(index.x - 1, index.y));
            dfsStack.push(new Vec2(index.x, index.y - 1));
        }

        return toBlast;
    }
}

