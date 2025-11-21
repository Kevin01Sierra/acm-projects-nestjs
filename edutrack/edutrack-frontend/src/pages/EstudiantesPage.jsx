import { Routes, Route } from 'react-router-dom';
import EstudiantesList from '../components/estudiantes/EstudiantesList';
import EstudianteForm from '../components/estudiantes/EstudianteForm';

const EstudiantesPage = () => {
  return (
    <Routes>
      <Route path="/" element={<EstudiantesList />} />
      <Route path="/nuevo" element={<EstudianteForm />} />
      <Route path="/editar/:id" element={<EstudianteForm />} />
    </Routes>
  );
};

export default EstudiantesPage;
