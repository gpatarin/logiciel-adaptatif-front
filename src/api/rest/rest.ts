import API from '../';

async function create<T>(path: string, body: T) {
  return (await API.put(path, body)).data;
}

async function readAll(path: string) {
  return (await API.get(path)).data;
}

async function read(path: string, id: string) {
  return (await API.get(`${path}/${id}`)).data;
}

async function update<T>(path: string, body: T) {
  return (await API.post(path, body)).data;
}

export default { create, readAll, read, update };
