import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Layout from './components/Layout';
import { routerBasename, ROUTES } from './config/routes';
import { AuthProvider } from './context/AuthContext';
import { PRODUCT_CATALOG } from './data/products';

import CaseStudyPage from './pages/CaseStudy';
import DownloadsPage from './pages/Downloads';
import LegalPage from './pages/Legal';
import OfferPage from './pages/Offer';
import PortfolioPage from './pages/Portfolio';
import ProductDetailPage from './pages/ProductDetail';
import ServicesPage from './pages/Services';
import LoginPage from './pages/Login';
import DocsPage from './pages/Docs';
import PortfolioManagerPage from './pages/PortfolioManager';
import ProtectedRoute from './components/ProtectedRoute';

function ExternalRedirect({ to }: { to: string }) {
  useEffect(() => {
    window.location.replace(to);
  }, [to]);

  return null;
}

function AppRoutes() {
  const basename = routerBasename === '/' ? undefined : routerBasename;

  return (
    <AuthProvider>
      <BrowserRouter basename={basename}>
        <Layout>
          <Routes>
            <Route path={ROUTES.root} element={<Navigate to={ROUTES.portfolioCanonical} replace />} />
            <Route path={ROUTES.login} element={<LoginPage />} />

            <Route path={ROUTES.portfolioCanonical} element={<PortfolioPage />} />
            <Route path={ROUTES.portfolioDynamic} element={<PortfolioPage />} />
            <Route path={ROUTES.portfolioLegacy} element={<Navigate to={ROUTES.portfolioCanonical} replace />} />

            <Route
              path={ROUTES.offer}
              element={
                <ProtectedRoute>
                  <OfferPage />
                </ProtectedRoute>
              }
            />
            <Route
              path={ROUTES.services}
              element={
                <ProtectedRoute>
                  <ServicesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path={ROUTES.downloads}
              element={
                <ProtectedRoute>
                  <DownloadsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path={ROUTES.docs}
              element={
                <ProtectedRoute>
                  <DocsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path={ROUTES.portfolioManager}
              element={
                <ProtectedRoute roles={['PRIME_OWNER', 'SUB_OWNER']}>
                  <PortfolioManagerPage />
                </ProtectedRoute>
              }
            />
            <Route
              path={ROUTES.caseStudy}
              element={
                <ProtectedRoute>
                  <CaseStudyPage />
                </ProtectedRoute>
              }
            />
            <Route
              path={ROUTES.legal}
              element={
                <ProtectedRoute>
                  <LegalPage />
                </ProtectedRoute>
              }
            />

            {PRODUCT_CATALOG.map((product) => (
              <Route
                key={product.id}
                path={`${ROUTES.downloads}/${product.slug}`}
                element={
                  <ProtectedRoute>
                    <ProductDetailPage slug={product.slug} />
                  </ProtectedRoute>
                }
              />
            ))}

            <Route
              path={ROUTES.hubLegacy}
              element={
                <ProtectedRoute>
                  <ExternalRedirect to="/pi" />
                </ProtectedRoute>
              }
            />
            <Route
              path={ROUTES.assetsLegacy}
              element={
                <ProtectedRoute>
                  <Navigate to={ROUTES.downloads} replace />
                </ProtectedRoute>
              }
            />
            <Route
              path={ROUTES.guardianLegacy}
              element={
                <ProtectedRoute>
                  <ExternalRedirect to="/pi" />
                </ProtectedRoute>
              }
            />
            <Route
              path={ROUTES.home}
              element={
                <ProtectedRoute>
                  <ExternalRedirect to="/pi" />
                </ProtectedRoute>
              }
            />
            <Route
              path={ROUTES.dashboardInstances}
              element={
                <ProtectedRoute>
                  <ExternalRedirect to="/pi" />
                </ProtectedRoute>
              }
            />
            <Route
              path={`${ROUTES.dashboardInstances}/:serviceSlug`}
              element={
                <ProtectedRoute>
                  <ExternalRedirect to="/pi" />
                </ProtectedRoute>
              }
            />
            <Route
              path={ROUTES.overview}
              element={
                <ProtectedRoute>
                  <ExternalRedirect to="/pi" />
                </ProtectedRoute>
              }
            />
            <Route
              path={ROUTES.guardian}
              element={
                <ProtectedRoute>
                  <ExternalRedirect to="/pi" />
                </ProtectedRoute>
              }
            />
            <Route
              path={ROUTES.upsell}
              element={
                <ProtectedRoute>
                  <ExternalRedirect to="/pi" />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to={ROUTES.portfolioCanonical} replace />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default AppRoutes;
