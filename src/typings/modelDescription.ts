
type AttributesType = "string" | "string[]" | "int" | "double" | "boolean" | "date" | "list"

export interface IAttribute {
  name: string,
  type: AttributesType,
}

export interface IAttributeTypeList extends IAttribute {
  type: "list",
  model: IModel,
}

export type Attributes = (IAttribute | IAttributeTypeList)[]

export interface IModel {
  name: string,
  attributes: Attributes,
}

export interface IModelDescription {
  [k: string]: IModel,
}
