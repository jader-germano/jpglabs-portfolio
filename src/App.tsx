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
import PublicHomePage from './pages/PublicHome';
import ServicesPage from './pages/Services';
import LoginPage from './pages/Login';
import DocsPage from './pages/Docs';
import PortfolioManagerPage from './pages/PortfolioManager';

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
            <Route path={ROUTES.root} element={<PublicHomePage />} />
            <Route path={ROUTES.login} element={<LoginPage />} />
            <Route path={ROUTES.offer} element={<OfferPage />} />
            <Route path={ROUTES.services} element={<ServicesPage />} />
            <Route path={ROUTES.downloads} element={<DownloadsPage />} />
            <Route path={ROUTES.docs} element={<DocsPage />} />
            <Route path={ROUTES.portfolioManager} element={<PortfolioManagerPage />} />
            <Route path={ROUTES.portfolioCanonical} element={<PortfolioPage />} />
            <Route path={ROUTES.portfolioDynamic} element={<PortfolioPage />} />
            <Route path={ROUTES.caseStudy} element={<CaseStudyPage />} />
            <Route path={ROUTES.legal} element={<LegalPage />} />

            <Route path={ROUTES.portfolioLegacy} element={<Navigate to={ROUTES.portfolioCanonical} replace />} />
            <Route path={ROUTES.hubLegacy} element={<ExternalRedirect to="/pi" />} />
            <Route path={ROUTES.assetsLegacy} element={<Navigate to={ROUTES.downloads} replace />} />
            <Route path={ROUTES.guardianLegacy} element={<ExternalRedirect to="/pi" />} />
            <Route path={ROUTES.home} element={<ExternalRedirect to="/pi" />} />

            {PRODUCT_CATALOG.map((product) => (
              <Route
                key={product.id}
                path={`${ROUTES.downloads}/${product.slug}`}
                element={<ProductDetailPage slug={product.slug} />}
              />
            ))}

            <Route path={ROUTES.dashboardInstances} element={<ExternalRedirect to="/pi" />} />
            <Route path={`${ROUTES.dashboardInstances}/:serviceSlug`} element={<ExternalRedirect to="/pi" />} />
            <Route path={ROUTES.overview} element={<ExternalRedirect to="/pi" />} />
            <Route path={ROUTES.guardian} element={<ExternalRedirect to="/pi" />} />
            <Route path={ROUTES.upsell} element={<ExternalRedirect to="/pi" />} />
            <Route path="*" element={<Navigate to={ROUTES.root} replace />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default AppRoutes;
