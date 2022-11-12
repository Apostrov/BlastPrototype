import { Vec2 } from "cc";
import { BlockColor } from "../Block/Block";
import { IBlock } from "../Block/IBlock";

export class FieldBlastSolver {
    public static dfsBlastSolve(startBlock: IBlock, field: IBlock[][]): IBlock[] {
        let toBlast: IBlock[] = [];
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

    public static isFieldSolvable(field: IBlock[][]): boolean {
        for (let i = 1; i < field.length; i++) {
            for (let j = 1; j < field[i].length; j++) {
                let color = field[i][j].getColor();
                if(field[i - 1][j].getColor() == color)
                    return true;
                if(field[i][j - 1].getColor() == color)
                    return true;
            }
        }
        return false;
    }
}

