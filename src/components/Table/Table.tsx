import { Attributes } from "../../typings/modelDescription";
import { AnyObject } from "../../typings/utils";

interface Props {
  attributes: Attributes,
  data: AnyObject[],
};


const Table: React.FC<Props> = ({ data, attributes }) => {

  if(data.length === 0) return <h3>No data</h3>

  return (
    <table>
      <thead>
        <tr>
          {attributes.map(({name}) => (<th>{name}</th>))}
        </tr>
      </thead>
      {data.map((line) => {
        return (
          <tr key={line.id}>
            {Object.keys(line).map((k) => (
              <td key={k}>
                {line[k]}
              </td>
            ))}
          </tr>
        );
      })}
    </table>
  );
}

export default Table
