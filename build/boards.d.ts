/// <reference types="node" />
type BoardsType = {
    name: string;
    baud: number;
    signature: Buffer;
    pageSize?: number;
    delay1?: number;
    delay2?: number;
    timeout?: number;
    stabDelay?: number;
    cmdexeDelay?: number;
    synchLoops?: number;
    byteDelay?: number;
    pollValue?: number;
    pollIndex?: number;
    numPages?: number;
    productId?: string[];
    productPage: string;
    protocol: string;
    aliases?: string[];
};
interface ByBoardType {
    [x: string]: BoardsType;
}
declare const boardLookupTableReturn: ByBoardType;
export default boardLookupTableReturn;
//# sourceMappingURL=boards.d.ts.map