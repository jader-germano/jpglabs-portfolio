import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import SessionTimeoutManager from './components/SessionTimeoutManager';
import PrivacyPageClient from './components/PrivacyPageClient';
import TermsPageClient from './components/TermsPageClient';
import InstancesDashboardClient from './components/InstancesDashboardClient';
import GuardianConsoleClient from './components/GuardianConsoleClient';
import { routerBasename, ROUTES } from './config/routes';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageProvider';
import { PRODUCT_CATALOG } from './data/products';

import CaseStudyPage from './pages/CaseStudy';
import DownloadsPage from './pages/Downloads';
import LegalPage from './pages/Legal';
import OfferPage from './pages/Offer';
import PortfolioPage from './pages/Portfolio';
import PortfolioHomePage from './pages/PortfolioHome';
import ProductDetailPage from './pages/ProductDetail';
// PublicHomePage preservado mas não é mais root — portfolio é a carta de entrada
// import PublicHomePage from './pages/PublicHome';
import ServicesPage from './pages/Services';
import DocsPage from './pages/Docs';
import LoginPage from './pages/Login';
import AuthCallbackPage from './pages/AuthCallback';

const normalizeBasePath = (value: string): string => value.replace(/\/+$/, '');
const AI_FRONTEND_BASE = normalizeBasePath(import.meta.env.VITE_AI_FRONTEND_URL ?? '/pi');
const toAiFrontend = (pathname = ''): string => `${AI_FRONTEND_BASE}${pathname}`;

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
      <LanguageProvider>
        <BrowserRouter basename={basename}>
          <SessionTimeoutManager />
          <Layout>
            <Routes>
              {/* Portfolio é carta de entrada — root redireciona pra portfolio canônico do Jader */}
              <Route path={ROUTES.root} element={<Navigate to={ROUTES.portfolioCanonical} replace />} />
              <Route path={ROUTES.login} element={<LoginPage />} />
              <Route path={ROUTES.authCallback} element={<AuthCallbackPage />} />
              <Route path={ROUTES.offer} element={<OfferPage />} />
              <Route path={ROUTES.services} element={<ServicesPage />} />
              <Route path={ROUTES.downloads} element={<DownloadsPage />} />
              <Route path={ROUTES.docs} element={<DocsPage />} />
              <Route path={ROUTES.portfolioManager} element={<ExternalRedirect to={toAiFrontend('/dashboard/assistant')} />} />
              <Route path={ROUTES.portfolioCanonical} element={<PortfolioPage />} />
              <Route path={ROUTES.portfolioDynamic} element={<PortfolioPage />} />
              <Route path={ROUTES.caseStudy} element={<CaseStudyPage />} />
              <Route path={ROUTES.legal} element={<LegalPage />} />

              {/* Migrated narrative surfaces — wave 2 */}
              <Route path="/privacy" element={<PrivacyPageClient />} />
              <Route path="/terms" element={<TermsPageClient />} />
              <Route path={ROUTES.home} element={<PortfolioHomePage />} />

              <Route path={ROUTES.portfolioLegacy} element={<Navigate to={ROUTES.portfolioCanonical} replace />} />
              <Route path={ROUTES.hubLegacy} element={<ExternalRedirect to={toAiFrontend()} />} />
              <Route path={ROUTES.assetsLegacy} element={<Navigate to={ROUTES.downloads} replace />} />
              <Route path={ROUTES.guardianLegacy} element={<ExternalRedirect to={toAiFrontend('/dashboard/guardian')} />} />

              {PRODUCT_CATALOG.map((product) => (
                <Route
                  key={product.id}
                  path={`${ROUTES.downloads}/${product.slug}`}
                  element={<ProductDetailPage slug={product.slug} />}
                />
              ))}

              {/* Migrated dashboards — wave 2. Replace the previous ExternalRedirect
                 to the Next.js AI frontend now that Instances + Guardian live in the SPA. */}
              <Route
                path={ROUTES.dashboardInstances}
                element={
                  <ProtectedRoute>
                    <InstancesDashboardClient />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/guardian"
                element={
                  <ProtectedRoute>
                    <GuardianConsoleClient />
                  </ProtectedRoute>
                }
              />
              <Route path={`${ROUTES.dashboardInstances}/:serviceSlug`} element={<ExternalRedirect to={toAiFrontend('/dashboard/instances')} />} />
              <Route path={ROUTES.overview} element={<ExternalRedirect to={toAiFrontend('/dashboard/assistant')} />} />
              <Route path={ROUTES.guardian} element={<ExternalRedirect to={toAiFrontend('/dashboard/guardian')} />} />
              <Route path={ROUTES.upsell} element={<ExternalRedirect to={toAiFrontend('/dashboard/assistant')} />} />
              <Route path="*" element={<Navigate to={ROUTES.root} replace />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default AppRoutes;
