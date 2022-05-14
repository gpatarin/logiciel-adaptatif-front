import API from '../';
import { IModelDescription } from '../../typings/modelDescription';

async function getModels(): Promise<IModelDescription> {
  return (await API.get('resolver')).data as IModelDescription;
}

export default getModels;
