import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import { routerBasename, ROUTES } from './config/routes';
import { AuthProvider } from './context/AuthContext';
import { PRODUCT_CATALOG } from './data/products';

import CaseStudyPage from './pages/CaseStudy';
import DownloadsPage from './pages/Downloads';
import GuardianPage from './pages/Guardian';
import HomePage from './pages/Home';
import InstancesPage from './pages/Instances';
import LegalPage from './pages/Legal';
import OfferPage from './pages/Offer';
import OverviewPage from './pages/Overview';
import PortfolioPage from './pages/Portfolio';
import ProductDetailPage from './pages/ProductDetail';
import ServiceDetailPage from './pages/ServiceDetail';
import ServicesPage from './pages/Services';
import UpsellPage from './pages/Upsell';

function AppRoutes() {
  const basename = routerBasename === '/' ? undefined : routerBasename;

  return (
    <AuthProvider>
      <BrowserRouter basename={basename}>
        <Layout>
          <Routes>
            <Route path={ROUTES.offer} element={<OfferPage />} />
            <Route path={ROUTES.services} element={<ServicesPage />} />
            <Route path={ROUTES.portfolioCanonical} element={<PortfolioPage />} />
            <Route path={ROUTES.portfolioDynamic} element={<PortfolioPage />} />
            <Route path={ROUTES.caseStudy} element={<CaseStudyPage />} />
            <Route path={ROUTES.legal} element={<LegalPage />} />

            <Route path={ROUTES.root} element={<Navigate to={ROUTES.offer} replace />} />
            <Route path={ROUTES.portfolioLegacy} element={<Navigate to={ROUTES.portfolioCanonical} replace />} />
            <Route path={ROUTES.hubLegacy} element={<Navigate to={ROUTES.portfolioCanonical} replace />} />
            <Route path={ROUTES.assetsLegacy} element={<Navigate to={ROUTES.downloads} replace />} />
            <Route path={ROUTES.guardianLegacy} element={<Navigate to={ROUTES.guardian} replace />} />

            <Route
              path={ROUTES.home}
              element={
                <ProtectedRoute>
                  <HomePage />
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
              path={ROUTES.dashboardInstances}
              element={
                <ProtectedRoute roles={['ADMIN', 'USER_CONSULTANT']}>
                  <InstancesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path={`${ROUTES.dashboardInstances}/:serviceSlug`}
              element={
                <ProtectedRoute roles={['ADMIN', 'USER_CONSULTANT']}>
                  <ServiceDetailPage />
                </ProtectedRoute>
              }
            />
            <Route
              path={ROUTES.overview}
              element={
                <ProtectedRoute roles={['ADMIN', 'USER_CONSULTANT']}>
                  <OverviewPage />
                </ProtectedRoute>
              }
            />

            <Route
              path={ROUTES.guardian}
              element={
                <ProtectedRoute roles={['ADMIN']}>
                  <GuardianPage />
                </ProtectedRoute>
              }
            />
            <Route
              path={ROUTES.upsell}
              element={
                <ProtectedRoute roles={['ADMIN']}>
                  <UpsellPage />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<Navigate to={ROUTES.offer} replace />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default AppRoutes;
