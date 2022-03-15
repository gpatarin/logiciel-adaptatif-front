import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import rest from '../api/rest/rest';
import Table from '../components/Table';
import ModelsContext from '../context/modelsContext';
import { IModel } from '../typings/modelDescription';
import { AnyObject } from '../typings/utils';

const ModelPage: React.FC = () => {
  const [model, setModel] = useState<IModel>();
  const [data, setData] = useState<AnyObject[] | null>(null);

  const { models } = useContext(ModelsContext);
  const { model: modelName } = useParams();

  useEffect(() => {
    if(modelName && Object.keys(models).length > 0) {
      setModel(models[modelName.charAt(0).toUpperCase() + modelName.slice(1)])
    }
  }, [models, modelName]);

  useEffect(() => {
    if(model) {
      rest.readAll(model.name).then(setData);
    }
  }, [model])

  return (
    <div>
      {(!model || !data) && <h1>Loading...</h1>}
      {(model && data) && (
        <>
          <h1>{model.name.charAt(0).toUpperCase() + model.name.slice(1)}</h1>
          <button>Add +</button>
          <Table attributes={model.attributes} data={data} />
        </>
      )}
    </div>
  );
}

export default ModelPage
