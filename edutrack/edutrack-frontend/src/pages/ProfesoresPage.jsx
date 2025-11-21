import { Routes, Route } from 'react-router-dom';
import ProfesorList from '../components/profesores/ProfesorList';
import ProfesorForm from '../components/profesores/ProfesorForm';

const ProfesoresPage = () => {
  return (
    <Routes>
      <Route path="/" element={<ProfesorList />} />
      <Route path="/nuevo" element={<ProfesorForm />} />
      <Route path="/editar/:id" element={<ProfesorForm />} />
    </Routes>
  );
};

export default ProfesoresPage;
