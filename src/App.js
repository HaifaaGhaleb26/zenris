import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './supabaseClient';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import ManageProjects from './pages/ManageProjects';
import Settings from './pages/Settings';
import Login from './pages/Login';
import ResetPassword from './pages/ResetPassword';
import './App.css';

function App() {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  const normalizeStatus = (status) => String(status ?? 'todo').trim().toLowerCase();
  const normalizeTask = (task) => ({
    ...task,
    status: normalizeStatus(task.status),
  });

  // 1. مراقبة الجلسة وتحديثها عند تسجيل الدخول / الخروج
  useEffect(() => {
    async function loadSession() {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    }

    loadSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // 2. جلب المشاريع والمهام الخاصة بالمستخدم الحالي فقط
  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      if (!session?.user) {
        setProjects([]);
        setTasks([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setProjects([]);
      setTasks([]);

      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError || !user) {
          console.error('❌ Failed to get current user:', userError);
          if (isMounted) setLoading(false);
          return;
        }

        const userId = user.id;

        const [
          { data: projs, error: projErr },
          { data: tsk, error: tskErr },
        ] = await Promise.all([
          supabase
            .from('projects')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false }),
          supabase
            .from('tasks')
            .select('*')
            .eq('user_id', userId),
        ]);

        if (isMounted) {
          setProjects(!projErr && projs ? projs : []);
          setTasks(!tskErr && tsk ? tsk.map(normalizeTask) : []);
        }
      } catch (err) {
        console.error(' Error fetching Zenris data:', err);
        if (isMounted) {
          setProjects([]);
          setTasks([]);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);
 

  const handleAddTask = async (title, projectId) => {
    if (!session?.user) return;

    const { data, error } = await supabase
      .from('tasks')
      .insert([
        {
          title,
          project_id: projectId,
          status: 'todo',
          user_id: session.user.id,
        },
      ])
      .select('*');

    if (error) {
      console.error('Task insert failed:', error);
      return;
    }

    if (data?.length) {
      const createdTask = normalizeTask(data[0]);
      setTasks((prev) => [createdTask, ...prev]);
    }
  };

  const handleUpdateTaskStatus = async (taskId, newStatus) => {
    if (!session?.user) return;

    const { error } = await supabase
      .from('tasks')
      .update({ status: newStatus })
      .eq('id', taskId)
      .eq('user_id', session.user.id);

    if (!error) {
      setTasks((prev) =>
        prev.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task))
      );
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!session?.user) return;

    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', taskId)
      .eq('user_id', session.user.id);

    if (!error) {
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
    }
  };

  const handleAddProject = async (newProj) => {
    if (!session?.user) return;

    const payload = {
      ...newProj,
      user_id: session.user.id,
    };

    const { data, error } = await supabase
      .from('projects')
      .insert([payload])
      .select();

    if (!error && data?.length) {
      setProjects((prev) => [data[0], ...prev]);
    }
  };

  const handleDeleteProject = async (id) => {
    if (!session?.user) return;

    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id)
      .eq('user_id', session.user.id);

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
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="*" element={<Navigate to={session ? "/" : "/login"} replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;