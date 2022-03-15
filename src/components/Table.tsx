import { Attributes } from "../typings/modelDescription";

interface Props {
  attributes: Attributes,
  data: any[],
};


const Table: React.FC<Props> = ({ data, attributes }) => {

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
              <td key={k}>{line[k]}</td>
            ))}
          </tr>
        );
      })}
    </table>
  );
}

export default Table
