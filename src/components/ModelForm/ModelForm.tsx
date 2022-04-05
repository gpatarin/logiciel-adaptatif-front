import React, { ChangeEvent, DetailedHTMLProps, EventHandler, FormEvent, InputHTMLAttributes, useCallback, useEffect, useState } from 'react';
import { Attributes } from '../../typings/modelDescription';
import { AnyObject } from '../../typings/utils';

interface Props {
  attributes: Attributes,
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

  if(!visible) return null;

  return (
    <div>
      <button onClick={onClose}>Fermer</button>
      <div>
        {attributes.map(({ name, type }) => {
          if(name == "id") return;
          if(type == "list") return;
          return (
            <div key={name}>
              <label>
                {name}
                <input name={name} type={type} onChange={handleChange(name)} />
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
