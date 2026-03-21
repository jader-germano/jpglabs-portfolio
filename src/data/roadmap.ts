export type RoadmapPriority = 'critical' | 'high' | 'medium' | 'foundation';
export type RoadmapStatus = 'now' | 'next' | 'planned' | 'research';

export interface RoadmapLink {
  label: string;
  href: string;
}

export interface RoadmapItem {
  id: string;
  title: string;
  area: string;
  priority: RoadmapPriority;
  status: RoadmapStatus;
  ownerAgent: string;
  skillTrack: string;
  summary: string;
  deliverables: string[];
  dependencies: string[];
  links?: RoadmapLink[];
}

export const ROADMAP_ITEMS: RoadmapItem[] = [
  {
    id: 'dashboard-hardening',
    title: 'Dashboard hardening and live operational visibility',
    area: 'Dashboard',
    priority: 'critical',
    status: 'now',
    ownerAgent: 'Agent Atlas',
    skillTrack: 'Infra Visibility',
    summary:
      'Continue replacing synthetic dashboard confidence with live operational checkpoints after the first real Pi runtime integration shipped.',
    deliverables: [
      '✅ Fix root-domain 404 on jpglabs.com.br',
      '✅ Replace mock Instances and Guardian cards with live Pi runtime summaries',
      '✅ Publish a live Pi runtime snapshot on the public home and dashboard lanes',
      'Validate n8n TLS chain and Cloudflare/Traefik routing',
      'Wire actionable filters and search into Instances',
      'Expose incident, SLA and dependency summaries in Overview',
    ],
    dependencies: ['Current Pi runtime contracts and access to VPS logs / Traefik routing state'],
    links: [{ label: 'Portfolio App', href: 'https://github.com/jader-germano/jpglabs-portfolio' }],
  },
  {
    id: 'portfolio-solution-library',
    title: 'Portfolio experience expansion and solution library',
    area: 'Portfolio',
    priority: 'high',
    status: 'now',
    ownerAgent: 'Agent Mercury',
    skillTrack: 'Experience Design',
    summary:
      'Turn the portfolio into a proof-of-work surface with detailed experiences, shipped solutions and versioned technology references.',
    deliverables: [
      'Expand each experience with concrete solutions and outcomes',
      'List GitHub sources and version-aware framework/language references',
      'Add links to documentation for Java 21, Angular 20, React 19, Vite 7, n8n and Docker',
      'Ingest CV data as a source for portfolio copy refinement',
    ],
    dependencies: ['CV normalization and repo-to-solution mapping'],
  },
  {
    id: 'docs-unification',
    title: 'Unified documentation repository with solution sections',
    area: 'Documentation',
    priority: 'critical',
    status: 'next',
    ownerAgent: 'Agent Scribe',
    skillTrack: 'Docs Architecture',
    summary:
      'Consolidate fragmented docs, PDFs and workflow notes into one canonical documentation repo with sanitized public/private boundaries.',
    deliverables: [
      'Create a dedicated docs repo with platform and solution sections',
      'Archive duplicate workflow exports and remove path leakage',
      'Split sensitive operations notes from public-facing docs',
      'Publish canonical links back into the portfolio system',
    ],
    dependencies: ['Secret sanitization and migration matrix approval'],
    links: [
      { label: 'JPGLabs Platform Repo', href: 'https://github.com/jader-germano/jpglabs' },
      { label: 'JPGLabs AI Assets', href: 'https://github.com/jader-germano/jpglabs-ai-assets' },
    ],
  },
  {
    id: 'repo-split-frontend-backend',
    title: 'Repository split and naming clarity for frontend and backend',
    area: 'Platform Strategy',
    priority: 'critical',
    status: 'next',
    ownerAgent: 'Agent Boundary',
    skillTrack: 'Repo Governance',
    summary:
      'Rename and reframe the local and Git repository boundaries so the portfolio frontend and the Next backend/BFF stop sharing ambiguous identity.',
    deliverables: [
      '✅ Local folders renamed: jpglabs-portfolio-frontend + jpglabs-portfolio-backend',
      'Prepare remote recreation/rename strategy with explicit frontend/backend naming',
      'Update compose, docs and path references to the new repository identities',
      'Keep commit creation gated by explicit user confirmation',
    ],
    dependencies: ['User confirmation before any commit or remote recreation'],
  },
  {
    id: 'next-backend-scale-foundation',
    title: 'Next backend foundation with business-scale constraints',
    area: 'Backend',
    priority: 'critical',
    status: 'now',
    ownerAgent: 'Agent Atlas',
    skillTrack: 'Backend Architecture',
    summary:
      'Treat the Next application as the first backend/BFF lane, carry forward the newly shipped runtime/auth/legal work, and harden it for hundreds or thousands of business users before adding the future Java replica.',
    deliverables: [
      '✅ Replace dashboard mock data with a private Pi runtime proxy on the Next backend lane',
      '✅ Add owner-role fallback so jader@jpglabs.com.br resolves to ROOT_ADMIN',
      '✅ Add login wordmark plus expanded legal/privacy copy',
      'Keep auth, session, audit and protected APIs stateless and externally backed',
      'Define async boundaries, rate limiting, retries and observability for bursty workloads',
      'Document the scaling assumptions for queueing, caching and horizontal replicas',
      'Separate frontend concerns from backend contracts in the epic backlog',
    ],
    dependencies: ['Supabase boundary clarity and frontend/backend split approval'],
  },
  {
    id: 'frontend-backend-contract-adoption',
    title: 'Public frontend and Next backend contract adoption',
    area: 'Frontend Platform',
    priority: 'high',
    status: 'next',
    ownerAgent: 'Agent Boundary',
    skillTrack: 'Contract Integration',
    summary:
      'Decide how the Vite public frontend should consume the newly hardened Next backend contracts without reintroducing mixed public/private surface confusion.',
    deliverables: [
      'Map which public-safe and authenticated contracts should be shared between the Vite frontend and the Next backend',
      'Promote a public-safe runtime snapshot contract for homepage and credibility cards',
      'Keep authenticated dashboard payloads private behind the backend lane',
      'Remove duplicated runtime assumptions from the frontend once contract adoption is approved',
    ],
    dependencies: ['Current Next backend runtime proxy in place', 'Public/private contract boundary approval'],
  },
  {
    id: 'supabase-contract-and-quarkus-docs',
    title: 'Supabase contract documentation for later Quarkus parity',
    area: 'Data Platform',
    priority: 'critical',
    status: 'next',
    ownerAgent: 'Agent Schema',
    skillTrack: 'Contract Documentation',
    summary:
      'Document Supabase deeply enough that the Next backend can later be replicated by a separate Java + Quarkus lane without semantic drift.',
    deliverables: [
      'Make Auth, Postgres and Storage ownership boundaries explicit',
      'Record schema semantics, audit expectations and session rules',
      'Freeze contract notes that the future Java + Quarkus lane must mirror',
      'Track official Java and Quarkus version checkpoints with source links',
    ],
    dependencies: ['Current Next backend flow mapped end to end'],
  },
  {
    id: 'resume-upload-discovery',
    title: 'Resume upload discovery before implementation lock-in',
    area: 'Product Discovery',
    priority: 'high',
    status: 'now',
    ownerAgent: 'Agent Intake',
    skillTrack: 'Requirements Discovery',
    summary:
      'Treat the curriculum upload flow as a requirements and contract-discovery phase before committing to the final parsing and persistence implementation.',
    deliverables: [
      'Map inputs, expected outputs and failure states for the intake flow',
      'Define privacy, consent and retention rules for uploaded files',
      'Separate discovery artifacts from the eventual parser implementation',
      'Close the requirement set before persisting final upload tables and jobs',
    ],
    dependencies: ['Supabase boundary documentation and privacy review'],
  },
  {
    id: 'mobile-dual-backend-app',
    title: 'Mobile app over the dual-backend load-balanced API',
    area: 'Mobile',
    priority: 'critical',
    status: 'next',
    ownerAgent: 'Agent Orbit',
    skillTrack: 'Mobile Delivery',
    summary:
      'Build the next mobile application against the shared load-balancer entrypoint so it can consume the synchronized Next backend lane and the later Java + Quarkus replica through one contract.',
    deliverables: [
      'Define the mobile app architecture and API consumption strategy against the load-balanced edge',
      'Validate auth, session and failover behavior when requests are served by the Node or Java lane',
      'Establish contract-test coverage for mobile-critical flows across both services',
      'Prepare the first mobile delivery sprint after systems stabilization and documentation closure',
    ],
    dependencies: [
      'Stabilized production systems and trusted operational visibility',
      'Canonical documentation published for the shared API and platform topology',
      'Parity rules in place for the Next backend and Java + Quarkus services behind the load balancer',
    ],
    links: [
      { label: 'Architecture Note', href: '/docs/reactive-backend-migration.md' },
      { label: 'Expo Docs', href: 'https://docs.expo.dev/' },
    ],
  },
  {
    id: 'cloudflare-dns-mail',
    title: 'DNS, Cloudflare and mail hardening runbook',
    area: 'Infrastructure',
    priority: 'critical',
    status: 'now',
    ownerAgent: 'Agent Edge',
    skillTrack: 'Network Operations',
    summary:
      'Validate the current DNS state, remove exposed secrets from docs and formalize the pending Cloudflare/mail actions.',
    deliverables: [
      'Rotate exposed Cloudflare API token and purge it from docs',
      'Confirm DKIM, MX, SPF and DMARC operational state',
      'Document which records should stay proxied vs DNS only',
      'Add Cloudflare action checklist inside the dashboard roadmap',
    ],
    dependencies: ['Cloudflare dashboard access and token rotation window'],
  },
  {
    id: 'n8n-runbook-secrets',
    title: 'n8n operational documentation and pending key inventory',
    area: 'Automation',
    priority: 'critical',
    status: 'now',
    ownerAgent: 'Agent Flow',
    skillTrack: 'AgentOps',
    summary:
      'Document the active n8n stack, normalize canonical workflows and make the missing env and API-key set explicit.',
    deliverables: [
      'Document the 7 active workflows running on the VPS',
      'Promote one canonical export per workflow and archive duplicates',
      'Complete .env coverage for delivery, WhatsApp, notifications and webhooks',
      'Track unresolved keys and credentials with owner and status',
    ],
    dependencies: ['n8n export review and workflow import policy'],
    links: [{ label: 'JPGLabs n8n Repo', href: 'https://github.com/jader-germano/jpglabs' }],
  },
  {
    id: 'pdf-private-product-line',
    title: 'Private product repository and premium PDF redesign',
    area: 'Assets',
    priority: 'high',
    status: 'planned',
    ownerAgent: 'Agent Forge',
    skillTrack: 'Product Packaging',
    summary:
      'Move the PDF product line to a private Git repo, align visuals with the system and publish new research-backed offers.',
    deliverables: [
      'Split premium PDFs into a private repository',
      'Rebuild current PDFs with the portfolio visual language',
      'Create new technically valuable products with cited market/source research',
      'Keep HTML/PDF source-of-truth versioned per release',
    ],
    dependencies: ['Unified docs repo structure and product strategy approval'],
  },
  {
    id: 'i18n-pt-en-es',
    title: 'PT / EN / ES internationalization',
    area: 'Experience',
    priority: 'high',
    status: 'planned',
    ownerAgent: 'Agent Babel',
    skillTrack: 'Localization',
    summary:
      'Introduce translation infrastructure and deliver the final system experience in Portuguese, English and Spanish.',
    deliverables: [
      'Language switcher in the main shell',
      'Shared translation dictionaries for portfolio, docs, services and roadmap',
      'Fallback strategy for untranslated content blocks',
      'QA pass on layout integrity across languages',
    ],
    dependencies: ['Content freeze for roadmap and documentation copy'],
  },
  {
    id: 'profile-flow-qa',
    title: 'Profile-flow validation with new test users',
    area: 'Access Control',
    priority: 'high',
    status: 'next',
    ownerAgent: 'Agent Gate',
    skillTrack: 'Role QA',
    summary:
      'Add realistic mock users and verify the route, entitlement and visibility behavior per role.',
    deliverables: [
      'Introduce two new test users for consultant and client flows',
      'Validate nav, downloads and dashboard behavior per role',
      'Document expected access matrix and redirect behavior',
      'Prepare future migration to real identity provider',
    ],
    dependencies: ['Stable auth copy and entitlement rules'],
  },
  {
    id: 'llm-strategy-review',
    title: 'Internal LLM strategy review: Llama vs Sonnet vs ChatGPT',
    area: 'AI Platform',
    priority: 'medium',
    status: 'research',
    ownerAgent: 'Agent Cortex',
    skillTrack: 'Model Strategy',
    summary:
      'Reevaluate the local-LLM lane against current hosted frontier models and define which workloads should stay local versus external.',
    deliverables: [
      'Benchmark latency, cost, privacy and ops burden per workload class',
      'Compare local Llama stack against Claude Sonnet and GPT-5 / ChatGPT line',
      'Define routing policy for coding, support, automation and retrieval tasks',
      'Recommend fallback and cache strategy for hybrid operation',
    ],
    dependencies: ['Current usage traces from Ollama/open-webui and hosted API pricing'],
    links: [
      { label: 'Anthropic Models', href: 'https://docs.anthropic.com/en/docs/about-claude/models/overview' },
      { label: 'OpenAI Model Release Notes', href: 'https://help.openai.com/en/articles/9624314-model-release-notes' },
      { label: 'Meta Llama 4', href: 'https://ai.meta.com/llama/' },
    ],
  },
  {
    id: 'reactive-backend-spike',
    title: 'Dual-backend scale track: Next backend lane + Java Quarkus replica',
    area: 'Architecture',
    priority: 'foundation',
    status: 'research',
    ownerAgent: 'Agent Reactor',
    skillTrack: 'Scalability Architecture',
    summary:
      'Keep the Next backend/BFF lane alive and evolve it with scalable async patterns, while documenting a separate Java + Quarkus replica service for the final post-deploy epic.',
    deliverables: [
      'Implement the Next backend lane with stateless scaling, async boundaries and backpressure-aware workloads',
      'Define API parity rules for a separate Java + Quarkus replica service running behind the same load balancer',
      'Document the migration path and ADR for a new Java API repository dedicated to the replica architecture',
      'Establish a dual-update policy so Next and Java stay aligned as showcase services for the same contracts',
    ],
    dependencies: ['Current Next backend ownership, contract boundaries and load-balancer routing strategy'],
    links: [
      { label: 'Architecture Note', href: '/docs/reactive-backend-migration.md' },
      { label: 'Node.js Docs', href: 'https://nodejs.org/en/docs' },
      { label: 'Quarkus Docs', href: 'https://quarkus.io/' },
    ],
  },
  {
    id: 'vps-reboot-and-hostinger-mcp',
    title: 'Full VPS reboot and Hostinger MCP viability check',
    area: 'Infrastructure',
    priority: 'high',
    status: 'next',
    ownerAgent: 'Agent Edge',
    skillTrack: 'Infra Control',
    summary:
      'After local stabilization and before Epic 2, fully restart the VPS and verify whether Hostinger MCP can participate in the reconstruction workflow.',
    deliverables: [
      'Perform a controlled VPS reboot with baseline evidence before and after',
      'Check service reachability after boot before reintroducing application changes',
      'Validate whether Hostinger MCP is accessible and useful for orchestration',
      'Define SSH/manual fallback if Hostinger MCP cannot be used',
    ],
    dependencies: ['Hostinger API token or an approved fallback access path'],
  },
  {
    id: 'portfolio-preview-cicd-lane',
    title: 'Portfolio preview CI/CD lane for the backend track',
    area: 'Release Engineering',
    priority: 'high',
    status: 'next',
    ownerAgent: 'Agent Launch',
    skillTrack: 'Preview Delivery',
    summary:
      'Reconnect the stale backend workflow to a preview lane so portfolio backend changes can be validated before they pressure the main VPS path.',
    deliverables: [
      'Audit the current backend workflow and identify why the preview lane is stale',
      'Wire a portfolio-preview deployment target with explicit namespace, ingress and rollback rules',
      'Publish preview validation steps for runtime, auth and dashboard contract changes',
      'Keep production cutover gated behind preview evidence instead of direct VPS pressure',
    ],
    dependencies: ['Current GitHub workflow inventory', 'Preview namespace or equivalent rollout target'],
  },
  {
    id: 'local-platform-compose-parity',
    title: 'Local Docker platform parity before VPS cutover',
    area: 'Platform',
    priority: 'high',
    status: 'planned',
    ownerAgent: 'Agent Forge',
    skillTrack: 'Local Platform',
    summary:
      'After Epic 10, assemble the local real-system topology in Docker before anything is served through CI/CD on the VPS.',
    deliverables: [
      'Run frontend, Next backend, n8n, Postgres and the chosen Supabase topology locally',
      'Add a mobile test instance consuming the same entrypoint contracts',
      'Validate auth, private routes, docs, dashboards and upload discovery flows locally',
      'Record the platform composition as the pre-cutover source of truth',
    ],
    dependencies: ['Epic 10 CI/CD baseline completed'],
  },
  {
    id: 'local-k8s-ci-cd-parity',
    title: 'Local Kubernetes and CI/CD parity for the full platform',
    area: 'Platform',
    priority: 'foundation',
    status: 'planned',
    ownerAgent: 'Agent Launch',
    skillTrack: 'Platform Delivery',
    summary:
      'Model the final platform in local Kubernetes with CI and CD flow before the VPS rollout.',
    deliverables: [
      'Create the local Kubernetes topology for frontend, backend, n8n, Postgres, Supabase and mobile test access',
      'Wire CI and CD to build, validate and roll out the local platform incrementally',
      'Validate secrets, config, health checks, ingress and rollback behavior',
      'Freeze the platform blueprint that will later be applied to the VPS',
    ],
    dependencies: ['Local Docker parity stack validated end to end'],
  },
  {
    id: 'final-java-quarkus-replica',
    title: 'Final Java + Quarkus replica after VPS deployment',
    area: 'Architecture',
    priority: 'foundation',
    status: 'planned',
    ownerAgent: 'Agent Reactor',
    skillTrack: 'Replica Architecture',
    summary:
      'Only after the Next backend lane is deployed and stable on the VPS, implement the separate Java + Quarkus replica against the same contracts.',
    deliverables: [
      'Open the dedicated Java + Quarkus repository with explicit contract ownership',
      'Replicate the documented Supabase semantics and API contracts',
      'Add parity and contract tests against the deployed Next backend lane',
      'Introduce the replica behind the shared edge only after stability proof',
    ],
    dependencies: ['Next backend deployed on VPS', 'Supabase contract documentation frozen', 'Platform topology stabilized after Epic 10'],
  },
  {
    id: 'deploy-8082',
    title: 'Publish portfolio root domain on jpglabs.com.br',
    area: 'Deployment',
    priority: 'critical',
    status: 'now',
    ownerAgent: 'Agent Launch',
    skillTrack: 'Release Engineering',
    summary:
      'Promote the Vite frontend to the public root domain without breaking the shared `/pi` service edge.',
    deliverables: [
      '✅ Build and publish the static portfolio frontend on `https://jpglabs.com.br/`',
      '✅ Preserve `/pi` reverse proxy routing for the Pi service on the same Nginx edge',
      '✅ Update VPS install/deploy scripts so Pi redeploys do not revert the root site',
      'Document the later Kubernetes cutover path for the root-domain owner',
    ],
    dependencies: ['Successful build of the new portfolio version'],
  },
];

export const ROADMAP_AREAS = ['All', ...new Set(ROADMAP_ITEMS.map((item) => item.area))];
