import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { LanguageProvider } from "./context/LanguageContext";
import { LifeMilestonesProvider } from "./context/LifeMilestonesContext";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import AddDocument from "./pages/AddDocument";
import AddLifeEvent from "./pages/AddLifeEvent";
import AccessHistory from "./pages/AccessHistory";
import ConsentRequests from "./pages/ConsentRequests";
import Dashboard from "./pages/Dashboard";
import DocumentDetails from "./pages/DocumentDetails";
import Documents from "./pages/Documents";
import DocumentMindmapPage from "./pages/DocumentMindmapPage";
import FamilyGroup from "./pages/FamilyGroup";
import Landing from "./pages/Landing";
import LifeEvents from "./pages/LifeEvents";
import LifeGraph from "./pages/LifeGraph";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Reminders from "./pages/Reminders";
import Settings from "./pages/Settings";
import ShareDocument from "./pages/ShareDocument";

export default function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <LifeMilestonesProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                element={
                  <ProtectedRoute>
                    <Layout />
                  </ProtectedRoute>
                }
              >
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/documents" element={<Documents />} />
                <Route path="/documents/add" element={<AddDocument />} />
                <Route path="/documents/:id" element={<DocumentDetails />} />
                <Route path="/share/:id" element={<ShareDocument />} />
                <Route path="/mindmap" element={<DocumentMindmapPage />} />
                <Route path="/consents" element={<ConsentRequests />} />
                <Route path="/history" element={<AccessHistory />} />
                <Route path="/life-events" element={<LifeEvents />} />
                <Route path="/life-events/add" element={<AddLifeEvent />} />
                <Route path="/family" element={<FamilyGroup />} />
                <Route path="/reminders" element={<Reminders />} />
                <Route path="/life-graph" element={<LifeGraph />} />
                <Route path="/settings" element={<Settings />} />
              </Route>
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </LifeMilestonesProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}
