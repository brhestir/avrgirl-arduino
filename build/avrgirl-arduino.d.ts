declare var injectDependencies: (boards: {
    [x: string]: {
        aliases: any;
    };
}, Connection: {
    new (arg0: any): any;
    prototype: {
        _listPorts: (arg0: any) => any;
    };
}, protocols: {
    [x: string]: () => void;
}) => (opts: {
    debug?: any;
    megaDebug?: any;
    board?: any;
    port?: any;
    manualReset?: any;
    disableVerify?: any;
}) => void;
//# sourceMappingURL=avrgirl-arduino.d.ts.map