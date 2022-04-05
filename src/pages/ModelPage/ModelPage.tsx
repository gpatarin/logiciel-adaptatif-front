import { useCallback, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import rest from '../../api/rest/rest';
import ModelForm from '../../components/ModelForm';
import Table from '../../components/Table';
import ModelsContext from '../../context/modelsContext';
import { Attributes, IModel } from '../../typings/modelDescription';
import { AnyObject } from '../../typings/utils';
import styles from './ModelPage.module.css';

const ModelPage: React.FC = () => {
  const [model, setModel] = useState<IModel>();
  const [data, setData] = useState<AnyObject[] | null>(null);
  const [formVisible, setFormVisible] = useState<boolean>(false);
  const [selected, setSelected] = useState<AnyObject | null>(null);

  const { models } = useContext(ModelsContext);
  const { model: modelName } = useParams();

  useEffect(() => {
    if(modelName && Object.keys(models).length > 0) {
      setModel(models[modelName.charAt(0).toUpperCase() + modelName.slice(1)]);
    }
  }, [models, modelName]);

  useEffect(() => {
    if(model) {
      rest.readAll(model.name).then(setData);
    }
  }, [model]);

  const handleClose = useCallback(() => {
    setFormVisible(false);
    setSelected(null);
  }, []);

  useEffect(() => {
    handleClose();
  }, [modelName, handleClose])

  const buildEmptyState = (attr: Attributes) => {
    const state: AnyObject = {};
    attr.forEach(({ name, type }) => {
      if(type == 'list') return state[name] = [];
      state[name] = null;
    });
    return state;
  }

  const openForm = useCallback(() => {
    if(model) {
      setFormVisible(true);
    }
  }, [model])

  const handleEdit = useCallback((selected: AnyObject) => {
    setSelected(selected)
  }, []);

  const handleSubmit = useCallback((data) => {
    if(model) {
      rest.create(model.name, data)
      .then(() => (rest.readAll(model.name)))
      .then(setData)
      setFormVisible(false);
      setSelected(null);
    }
  }, [model])

  return (
    <div className={styles.container}>
      {(!model || !data) && <h1>Loading...</h1>}

      {(model && data) && (
        <div className={styles.modelList}>
          <h1>{model.name.charAt(0).toUpperCase() + model.name.slice(1)}</h1>
          <button onClick={openForm}>Add +</button>
          <Table
            attributes={model.attributes}
            data={data}
            onEdit={handleEdit}
          />
        </div>
      )}

      {(model) && (<div className={styles.modelForm}>
        <ModelForm
          attributes={model.attributes}
          data={selected || buildEmptyState(model.attributes)}
          visible={formVisible}
          onClose={handleClose}
          onSubmit={handleSubmit}
        />
      </div>)}
    </div>
  );
}

export default ModelPage
