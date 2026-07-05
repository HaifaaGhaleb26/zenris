import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './supabaseClient';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import ManageProjects from './pages/ManageProjects';
import Settings from './pages/Settings';
import Login from './pages/Login';
import './App.css';

function App() {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  // 1. مراقبة الجلسة
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // 2. جلب المشاريع والمهام معاً إذا تم تسجيل الدخول
  useEffect(() => {
    if (!session) {
      setLoading(false);
      return;
    }

    async function fetchData() {
      try {
        setLoading(true);
        
        // جلب المشاريع
        const { data: projs, error: projErr } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });
        
        // جلب المهام
        const { data: tsk, error: tskErr } = await supabase
          .from('tasks')
          .select('*');

        if (!projErr && projs) setProjects(projs);
        if (!tskErr && tsk) setTasks(tsk);

      } catch (err) {
        console.error("❌ Error fetching data:", err);
      } finally {
        setLoading(false); 
      }
    }

    fetchData();
  }, [session]);

  const handleAddTask = async (title, projectId) => {
    const { data, error } = await supabase
      .from('tasks')
      .insert([{ title, project_id: projectId, status: 'todo' }])
      .select();

    if (!error && data) {
      setTasks((prev) => [data[0], ...prev]);
    }
  };

  const handleUpdateTaskStatus = async (taskId, newStatus) => {
    const { error } = await supabase
      .from('tasks')
      .update({ status: newStatus })
      .eq('id', taskId);

    if (!error) {
      setTasks((prev) => prev.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task)));
    }
  };

  const handleDeleteTask = async (taskId) => {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', taskId);

    if (!error) {
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
    }
  };

  const handleAddProject = async (newProj) => {
    const { data, error } = await supabase.from('projects').insert([newProj]).select();
    if (!error && data) {
      setProjects((prev) => [data[0], ...prev]);
    }
  };

  const handleDeleteProject = async (id) => {
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (!error) {
      setProjects((prev) => prev.filter((proj) => proj.id !== id));
      setTasks((prev) => prev.filter((task) => task.project_id !== id));
    }
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-card">
          <h2>Loading Zenris...</h2>
          <p>Securing your workspace, please wait.</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="app-container">
        {session && <Sidebar />}

        <main className={`main-content ${session ? 'main-content--with-sidebar' : ''}`}>
          <Routes>
            {/* صفحة الداشبورد بيمر لها المشاريع والمهام ودوال التحكم بالمهام */}
            <Route 
              path="/" 
              element={
                session ? (
                  <Dashboard 
                    projects={projects} 
                    tasks={tasks} 
                    onAddTask={handleAddTask}
                    onUpdateTaskStatus={handleUpdateTaskStatus}
                    onDeleteTask={handleDeleteTask}
                  />
                ) : (
                  <Navigate to="/login" replace />
                )
              } 
            />

            {/* صفحة إدارة المشاريع */}
            <Route path="/projects" 
              element={
                session ? (
                  <ManageProjects 
                    projects={projects} 
                    onAddProject={handleAddProject}
                    onDeleteProject={handleDeleteProject}
                  />
                ) : (
                  <Navigate to="/login" replace />
                )
              } 
            />

            <Route path="/settings" element={session ? <Settings /> : <Navigate to="/login" replace />} />
            <Route path="/login" element={!session ? <Login /> : <Navigate to="/" replace />} />
            <Route path="*" element={<Navigate to={session ? "/" : "/login"} replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;