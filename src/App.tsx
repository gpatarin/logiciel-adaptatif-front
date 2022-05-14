import { useMemo, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import getModels from './api/resolver/resolver';
import ModelsContext from './context/modelsContext';
import ModelPage from './pages/ModelPage';
import RootPage from './pages/RootPage';
import { IModelDescription } from './typings/modelDescription';

function App() {
  const [models, setModels] = useState<IModelDescription>({});

  useEffect(() => {
    getModels().then((data) => {
      setModels(data);
    })
  }, []);

  const contextValue = useMemo(() => ({models}), [models])

  return (
    <ModelsContext.Provider value={contextValue}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootPage />}>
            <Route path='/:model' element={<ModelPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ModelsContext.Provider>
  )
}

export default App
