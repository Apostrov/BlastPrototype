import { _decorator, Component, Prefab, Vec2 } from 'cc';
import { Block } from '../Block/Block';
import { GameConfig } from '../Game';
import { UIStateManager } from '../UI/UIStateManager';
import { FieldBlastSolver } from './FieldBlastSolver';
import { FieldGenerator } from './FieldGenerator';
import { FieldMovesCounter } from './FieldMovesCounter';
import { FieldPointsCounter } from './FieldPointsCounter';
const { ccclass, property } = _decorator;

@ccclass('Field')
export class Field extends Component {
    @property({ type: Prefab })
    public block: Prefab | null = null;
    @property({ type: FieldGenerator })
    public fieldGenerator: FieldGenerator | null = null;
    @property({ type: UIStateManager })
    public uiStateManager: UIStateManager | null = null;
    @property({ type: FieldPointsCounter })
    public pointsCounter: FieldPointsCounter | null = null;
    @property({ type: FieldMovesCounter })
    public movesCounter: FieldMovesCounter | null = null;

    private config: GameConfig | null = null;

    // runtime data
    private field: Block[][] = [];
    private refreshCount: number = 0;

    init(config: GameConfig) {
        this.config = config;
        this.refreshCount = 0;

        this.movesCounter.init(config);
        this.pointsCounter.init(config);

        this.field = new Array(this.config.gridSize.x)
            .fill(null)
            .map(() =>
                new Array(this.config.gridSize.y).fill(null)
            );
        this.fieldGenerator.fillEmptyBlocks(this.field, this.block, this);
        this.tryRefreshField();
    }

    public blockPressed(block: Block) {
        let toDestroy: Block[] = FieldBlastSolver.dfsBlastSolve(block, this.field);
        if (toDestroy.length < this.config.minBlastGroup) {
            this.blastCantDestroy(toDestroy);
            this.movesCounter.updateMovesNumber();
            return;
        }
        
        this.destroyBlocks(toDestroy);
        this.movesCounter.updateMovesNumber();
        this.fieldGenerator.rearrangeField(this.field);
        this.fieldGenerator.fillEmptyBlocks(this.field, this.block, this);
        this.tryRefreshField();
    }

    private destroyBlocks(toDestroy: Block[]) {
        toDestroy.forEach((element) => {
            this.pointsCounter.tryToCountPoints(element);
            let index = element.getIndex();
            this.field[index.x][index.y] = null;
            element.destroyBlock();
        });
    }

    private tryRefreshField() {
        if (FieldBlastSolver.isFieldSolvable(this.field))
            return;

        if (this.refreshCount >= this.config.maxFieldRefresh) {
            this.uiStateManager.onLose();
            return
        }

        this.clearField();
        this.fieldGenerator.fillEmptyBlocks(this.field, this.block, this);
        this.refreshCount++;

        this.tryRefreshField();
    }

    private clearField() {
        this.field.forEach((element) => {
            element.forEach((block) => block.destroyBlock())
            element.fill(null);
        });
    }

    private blastCantDestroy( toDestroy: Block[]) {
        toDestroy.forEach((block) => block.cantDestroy());
    }
}

