
export type AttributesType = "string" | "string[]" | "int" | "double" | "boolean" | "date" | "image"

export interface IAttribute<T extends string> {
  name: string,
  type: T,
}

export interface IAttributeTypeList extends IAttribute<"list"> {
  type: "list",
  model: IModel,
}
export type Attribute = IAttribute<AttributesType> | IAttributeTypeList
export type Attributes = Attribute[]

export interface IModel {
  name: string,
  attributes: Attributes,
}

export interface IModelDescription {
  [k: string]: IModel,
}
