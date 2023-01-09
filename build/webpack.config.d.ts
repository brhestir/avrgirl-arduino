declare const path: any;
declare const TerserPlugin: any;
declare const webpack: any;
declare const resolve: {
    fallback: {
        util: string;
        stream: string;
        os: string;
    };
};
declare const plugins: any[];
declare const importableConfig: {
    entry: string;
    output: {
        path: any;
        filename: string;
        libraryTarget: string;
    };
    optimization: {
        minimize: boolean;
    };
    resolve: {
        fallback: {
            util: string;
            stream: string;
            os: string;
        };
    };
    plugins: any[];
};
declare const importableMinConfig: {
    entry: string;
    output: {
        path: any;
        filename: string;
        libraryTarget: string;
    };
    optimization: {
        minimize: boolean;
        minimizer: any[];
    };
    resolve: {
        fallback: {
            util: string;
            stream: string;
            os: string;
        };
    };
    plugins: any[];
};
declare const globalConfig: {
    entry: string;
    output: {
        path: any;
        filename: string;
        library: string;
        libraryTarget: string;
    };
    optimization: {
        minimize: boolean;
        minimizer: any[];
    };
    resolve: {
        fallback: {
            util: string;
            stream: string;
            os: string;
        };
    };
};
declare const globalConfigNonMin: {
    entry: string;
    output: {
        path: any;
        filename: string;
        library: string;
        libraryTarget: string;
    };
    optimization: {
        minimize: boolean;
    };
    resolve: {
        fallback: {
            util: string;
            stream: string;
            os: string;
        };
    };
    plugins: any[];
};
//# sourceMappingURL=webpack.config.d.ts.map