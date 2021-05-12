export type ITsNamedExportFunction = {
  kind: "function";
  params: [{ name: string; type: string }];
  returns: { type: string; value: string };
};

export type ITsNamedExportVariable = {
  kind: "variable";
  value: any;
};

export type ITsSummaryNamedExport = { name: string; type: string } & (
  | ITsNamedExportFunction
  | ITsNamedExportVariable
);

export interface ITsAstOverview {
  namedExports: ITsSummaryNamedExport[];
  defaultExport:
    | false
    | {
        name: string;
        type: string;
        value: any;
        params?: {
          name: string;
          type: string;
        }[];
      };
  imports: {
    source: string;
    symbols: string[];
  }[];

  localFunctions: {
    name: string;
    params: {
      name: string;
      type: string;
    }[];
  }[];
}
