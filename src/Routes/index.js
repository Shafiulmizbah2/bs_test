import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardPage from "../pages/DashboardPage";
import LoginPage from "../pages/LoginPage";
import TasksPage from "../pages/TasksPage";
import MembersPage from "../pages/MembersPage";
import ProtectedRoute from "./ProtectedRoute";
import Layout from "../components/Layout";
import TaskDetailsPage from "../pages/TaskDetailsPage";
import MemberDetailsPage from "../pages/MemberDetailsPage";

export default () => {
  return (
    <>
      {/* //Routes below will contain Header & Footer */}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            path=""
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route path="/members" element={<Layout />}>
          <Route
            path=""
            element={
              <ProtectedRoute>
                <MembersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path=":memberId"
            element={
              <ProtectedRoute>
                <MemberDetailsPage />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route path="/tasks" element={<Layout />}>
          <Route
            path=""
            element={
              <ProtectedRoute>
                <TasksPage />
              </ProtectedRoute>
            }
          />
          <Route
            path=":taskId"
            element={
              <ProtectedRoute>
                <TaskDetailsPage />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* //Routes below will not contain Header & Footer */}
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
};
