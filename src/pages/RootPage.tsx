import { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom'
import ModelsContext from '../context/modelsContext';

const RootPage: React.FC = () => {

  const { models } = useContext(ModelsContext);

  return (
    <>
      {Object.keys(models).map((model) => {
        return (
          <Link key={model} to={`/${models[model].name}`}>
            <h2>{model}</h2>
          </Link>
        );
      })}
      <Outlet />
    </>
  );
}

export default RootPage
