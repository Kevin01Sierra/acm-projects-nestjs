import { Routes, Route } from 'react-router-dom';
import InscripcionesList from '../components/inscripciones/InscripcionesList';
import InscripcionForm from '../components/inscripciones/InscripcionForm';

const InscripcionesPage = () => {
  return (
    <Routes>
      <Route path="/" element={<InscripcionesList />} />
      <Route path="/nueva" element={<InscripcionForm />} />
      <Route path="/editar/:id" element={<InscripcionForm />} />
    </Routes>
  );
};

export default InscripcionesPage;
