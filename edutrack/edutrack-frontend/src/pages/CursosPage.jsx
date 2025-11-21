import { Routes, Route } from 'react-router-dom';
import CursosList from '../components/cursos/CursosList';
import CursoForm from '../components/cursos/CursoForm';

const CursosPage = () => {
  return (
    <Routes>
      <Route path="/" element={<CursosList />} />
      <Route path="/nuevo" element={<CursoForm />} />
      <Route path="/editar/:id" element={<CursoForm />} />
    </Routes>
  );
};

export default CursosPage;
