export type ITsNamedExportFunction = {
  kind: "function";
  params: Array<{ name: string; type: string }>;
  returns: { type?: string; value?: string };
};

export type ITsNamedExportVariable = {
  kind: "variable";
  type: string;
  value: any;
};

export type ITsNamedExportUnknown = {
  kind: "unknown";
  name: string;
  value: any;
};

export type ITsSummaryExport = { name: string } & (
  | ITsNamedExportFunction
  | ITsNamedExportVariable
  | ITsNamedExportUnknown
);

export type ITsSummaryImport = {
  source: string;
  symbols: string[];
};

export type ITsSummaryLocalFunction = {
  name: string;
  params: Array<{
    name: string;
    type: string;
  }>;
  returns: { type: string; value: string } | "void";
};

export type ITsSummaryDefaultExport = false | ITsSummaryExport;

export interface ITsSummaryOverview {
  namedExports: ITsSummaryExport[];
  /**
   * The characteristics of the default export (or `false` if there isn't one)
   */
  defaultExport: ITsSummaryDefaultExport;
  /**
   * Imports detected in the source
   */
  imports: ITsSummaryImport[];

  /**
   * Functions _defined_ but not _exported_ in the source
   */
  localFunctions: ITsSummaryLocalFunction[];
}
