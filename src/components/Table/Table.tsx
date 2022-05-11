import { Attributes } from "../../typings/modelDescription";
import { AnyObject } from "../../typings/utils";
import pencil from '../../static/pencil.png';
import bin from '../../static/bin.png';
import list from '../../static/list.png';
import { useCallback } from "react";
import { Link, useParams } from "react-router-dom";

interface Props {
  attributes: Attributes,
  data: AnyObject[],
  onEdit: (data: AnyObject) => void,
  onDelete: (id: string) => void,
};


const Table: React.FC<Props> = ({ data, attributes, onEdit, onDelete }) => {
  const { model } = useParams();

  const handleEdit = useCallback((toEdit: AnyObject) => () => {
    onEdit(toEdit);
  }, []);

  const handleDelete = useCallback((id: string) => () => {
    onDelete(id);
  }, []);

  const renderLine = (line: AnyObject) => {
    return attributes.map((k, index) => {
      const attribute = attributes[index];
      const value = line[k.name];

      switch (attribute.type) {
        case 'list':
          return (<td key={k.name}><Link to={`/${model}:${line.id}:${attribute.model.name}`}><img src={list} /></Link></td>)
        case 'boolean':
          return (<td key={k.name}><input type="checkbox" disabled checked={value} /></td>)
        default:
          return (<td key={k.name}>{value}</td>);
      }
    });
  }

  if(data.length === 0) return <h3>No data</h3>

  return (
    <table>
      <thead>
        <tr>
          {attributes.map(({name}) => (<th key={name}>{name}</th>))}
        </tr>
      </thead>
      <tbody>
        {data.map((line, index) => {
          return (
            <tr key={line.id || index}>
              {renderLine(line)}
              <td>
                <img src={pencil} onClick={handleEdit(line)} />
              </td>
              <td>
                <img src={bin} onClick={handleDelete(line.id || index)} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Table
