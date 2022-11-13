import { Vec2, Vec3 } from "cc";
import { BlockColor } from "./Block";

export interface IBlock {
    onBlockPress(callback: Function);
    getColor(): BlockColor;
    getIndex(): Vec2;
    setIndex(index: Vec2);
    setColor(color: BlockColor);
    updatePosition(pos: Vec3);
    destroyBlock();
    cantDestroyBlock();
}