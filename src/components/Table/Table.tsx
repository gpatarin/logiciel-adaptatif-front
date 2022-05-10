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
    return Object.keys(line).map((k, index) => {
      const attribute = attributes[index];
      const value = line[k];
      switch (attribute.type) {
        case 'list':
          return (<td key={k}><Link to={`/${model}:${line.id}:${attribute.model.name}`}><img src={list} /></Link></td>)
        default:
          return (<td key={k}>{value}</td>);
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
        {data.map((line) => {
          return (
            <tr key={line.id}>
              {renderLine(line)}
              <td>
                <img src={pencil} onClick={handleEdit(line)} />
              </td>
              <td>
                <img src={bin} onClick={handleDelete(line.id)} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Table
