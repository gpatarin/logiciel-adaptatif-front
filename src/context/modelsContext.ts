import React from 'react';
import { IModelDescription } from '../typings/modelDescription';

interface IModelContext {
  models: IModelDescription,
}

const defaultValue: IModelContext = {
  models: {},
}

export default React.createContext(defaultValue);
