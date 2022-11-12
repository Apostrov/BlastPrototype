import { Vec2, Vec3 } from "cc";
import { BlockColor } from "./Block";

export interface IBlock {
    getColor(): BlockColor;
    getIndex(): Vec2;
    updateIndex(index: Vec2);
    updatePosition(pos: Vec3);
    destroyBlock();
    cantDestroyBlock();
}