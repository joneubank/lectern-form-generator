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
  schemas: LecternSchema[];
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
  restrictions?: LecternFieldRestrictions;
};

export type LecternMetaValue = boolean | number | string;
export type LecternMeta = Record<string, LecternMetaValue>;

export type LecternRangeRestriction = {
  min?: number;
  exclusiveMin?: number;
  max?: number;
  exclusiveMax?: number;
};

export type LecternFieldRestrictions = {
  codeList?: number[] | string[];
  required?: boolean;
  regex?: string;
  script?: string[];
  range?: LecternRangeRestriction;
};

// This is separated from MetaValue because there is some expectation of supporting array values in the future
export type LecternFieldValue = boolean | number | string; // | number[] | string[];
