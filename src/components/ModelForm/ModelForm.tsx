import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { Attribute } from '../../typings/modelDescription';
import { AnyObject } from '../../typings/utils';
import { getBase64 } from '../../utils/files';

interface Props {
  attributes: Attribute[],
  data: AnyObject,
  visible: boolean,
  onClose: () => void,
  onSubmit: (data: AnyObject) => void,
};

const ModelForm: React.FC<Props> = (
  { attributes, data, visible, onClose, onSubmit }
) => {
  const [formData, setFormData] = useState(data);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleSubmit = useCallback(() => {
    onSubmit(formData)
  }, [onSubmit, formData]);

  const handleChange = (name: string) => (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => {
      const temp = { ...prev };
      temp[name] = event.target.value;
      return temp;
    });
  }

  const handleImage = (name: string) => (event: ChangeEvent<HTMLInputElement>) => {
    if(event.target.files) {
      const file = event.target.files[0];
      getBase64(file, (b64) => {
        setFormData((prev) => {
          const temp = { ...prev };
          temp[name] = b64;
          return temp;
        });
      });
    }
  }

  const handleDate = (name: string) => (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value)
    setFormData((prev) => {
      const temp = { ...prev };
      temp[name] = new Date(event.target.value).toISOString();
      console.log(temp)
      return temp;
    });
  }

  const handleCheckbox = (name: string) => (event: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => {
      const temp = { ...prev };
      temp[name] = event.target.checked;
      return temp;
    });
  }

  const generateInput = useCallback(({ name, type }: Attribute) => {
    switch (type) {
      case 'string':
        return <input type="text" value={formData[name] || ""} onChange={handleChange(name,)} />;
      case 'int':
        return <input type="number" step="1" value={formData[name] || 0} onChange={handleChange(name)} />;
      case 'double':
        return <input type="number" min={0} step="0.01" value={formData[name] || 0.00} onChange={handleChange(name)} />;
      case 'boolean':
        return <input type="checkbox" value={formData[name] || false} onChange={handleCheckbox(name)} />;
      case 'date':
        return <input type="datetime-local" value={formData[name] && new Date(formData[name]).toISOString().slice(0, -5)} onChange={handleDate(name)} />;
      case 'image':
        return (
                <>
                  <input type="file" onChange={handleImage(name)} />
                  {formData[name] && <img width="50px" src={formData[name]} />}
                </>
              );
      default:
        return <div>type Not implemented</div>
    }
  }, [formData])

  if(!visible) return null;

  return (
    <div>
      <button onClick={onClose}>Fermer</button>
      <div>
        {attributes.map(({ name, type }) => {
          if(name == "id") return;
          if(name == "createdAt") return;
          if(type == "list") return;
          return (
            <div key={name}>
              <label>
                {name}
                {generateInput({ name, type })}
              </label>
              <br />
            </div>
          )
        })}
        <button onClick={handleSubmit}>{data.id ? 'Modifier' : 'Ajouter'}</button>
      </div>
    </div>
  );
}

export default ModelForm
