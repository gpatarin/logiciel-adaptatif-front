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
  const [uri, setUri] = useState<string>();
  const [data, setData] = useState<AnyObject[] | null>(null);
  const [formVisible, setFormVisible] = useState<boolean>(false);
  const [selected, setSelected] = useState<AnyObject | null>(null);

  const { models } = useContext(ModelsContext);
  const { model: modelName } = useParams();


  useEffect(() => {
    if(modelName && Object.keys(models).length > 0) {
      const parsed = modelName.split(':');
      const rootModel = parsed[0].charAt(0).toUpperCase() + parsed[0].slice(1);
      let currentModel = models[rootModel];

      parsed.splice(0, 1)

      parsed.forEach((m, index) => {
        if(index % 2 !== 0) {
          const model = currentModel;

          const attribute = model.attributes.find((attr) => {
            if(attr.type === 'list') {
              return attr.model.name === m;
            }
            return false;
          });

          if(attribute && attribute.type === 'list') {
            currentModel = attribute.model;
          }
        }
      });

      setUri(modelName.replaceAll(':', '/'));
      setModel(currentModel);
      setData([]);
    }
  }, [models, modelName]);

  useEffect(() => {
    if(uri) {
      rest.readAll(uri).then(setData);
    }
  }, [uri]);

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
    openForm();
  }, [openForm]);

  const handleDelete = useCallback((id) => {
    if(model && uri) {
      rest.remove(uri, id)
      .then(() => {
        rest.readAll(uri).then(setData);
      });
    }
  }, [model, uri]);

  const handleSubmit = useCallback((data) => {
    if(model && uri) {
      if(data.id) {
        rest.update(uri, data).then(() => {
          rest.readAll(uri).then(setData);
        });
      } else {
        rest.create(uri, data)
          .then(() => (rest.readAll(uri)))
          .then(setData);
      }

      setFormVisible(false);
      setSelected(null);
    }
  }, [model, uri])

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
            onDelete={handleDelete}
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
