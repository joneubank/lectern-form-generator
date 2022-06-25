export enum LecternFieldTypes {
  Boolean = 'boolean',
  Integer = 'integer',
  Number = 'number',
  String = 'string',
}

export type LecternDictionary = {
  _id: string;
  name: string;
  version: string;
  createdAt: string;
  updatedAt: string;
};

export type LecternSchema = {
  name: string;
  description: string;
  fields: LecternField[];
  meta?: LecternMeta;
};

export type LecternField = {
  name: string;
  description: string;
  valueType: LecternFieldTypes;
  meta?: LecternMeta;
  restrictions?: LecterFieldRestrictions;
};

export type LecternMetaValue = boolean | number | string;
export type LecternMeta = Record<string, LecternMetaValue>;

export type LecterFieldRestrictions = {
  codeList?: number[] | string[];
  required?: boolean;
  regex?: string;
  script?: string[];
  range?: {
    min?: number;
    exclusiveMin?: number;
    max?: number;
    exclusiveMax?: number;
  };
};
