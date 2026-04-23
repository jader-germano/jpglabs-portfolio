import { z } from "zod";

const optionalString = z.string().trim().default("");
const optionalUrl = z.union([z.literal(""), z.string().trim().url()]).default("");

export const ContactSchema = z.object({
  location: optionalString,
  phone: optionalString,
  email: z.union([z.literal(""), z.string().trim().email()]).default(""),
  linkedin: optionalUrl,
  github: optionalUrl,
});

export const EducationSchema = z.object({
  institution: z.string().trim().min(2),
  degree: z.string().trim().min(2),
  period: z.string().trim().min(2),
});

export const ExperienceSchema = z.object({
  company: z.string().trim().min(2),
  role: z.string().trim().min(2),
  years: z.string().trim().min(2),
  summary: optionalString,
  tech: z.array(z.string().trim().min(1)).max(16).default([]),
});

export const ProjectSchema = z.object({
  name: z.string().trim().min(2),
  description: z.string().trim().min(2),
  tech: z.array(z.string().trim().min(1)).max(16).default([]),
});

export const PortfolioSchema = z.object({
  name: z.string().trim().min(2),
  title: z.string().trim().min(2),
  summary: z.string().trim().min(10),
  contact: ContactSchema.default({
    location: "",
    phone: "",
    email: "",
    linkedin: "",
    github: "",
  }),
  education: z.array(EducationSchema).default([]),
  experiences: z.array(ExperienceSchema).min(1),
  skills: z.array(z.string().trim().min(1)).max(40).default([]),
  projects: z.array(ProjectSchema).default([]),
});

export type Portfolio = z.infer<typeof PortfolioSchema>;

const PLACEHOLDER_PATTERN =
  /\b(previous company|placeholder|lorem ipsum|empresa anterior|universidade ficticia|example university|foo bar)\b/i;

const normalizeValue = (value: string): string =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/https?:\/\/(www\.)?/g, "")
    .replace(/[\u200B-\u200D\uFEFF]/g, "")
    .replace(/\s+/g, " ")
    .trim();

const normalizeSource = (value: string): string => normalizeValue(value);

const assertNoPlaceholder = (value: string, label: string) => {
  if (PLACEHOLDER_PATTERN.test(value)) {
    throw new Error(`${label} contains placeholder content`);
  }
};

const assertSourceContains = (source: string, value: string, label: string) => {
  const candidate = normalizeValue(value);
  if (!candidate) return;

  if (!source.includes(candidate)) {
    throw new Error(`${label} is not supported by the resume source`);
  }
};

const assertSourceContainsDateHints = (source: string, value: string, label: string) => {
  const years = value.match(/\b\d{4}\b/g) ?? [];
  if (!years.length) return;

  for (const year of years) {
    if (!source.includes(year)) {
      throw new Error(`${label} is not supported by the resume source`);
    }
  }
};

export function validatePortfolioAgainstResumeText(
  portfolio: Portfolio,
  resumeText: string,
): Portfolio {
  const source = normalizeSource(resumeText);

  if (!source || source.length < 50) {
    throw new Error("resume source is too short for validation");
  }

  assertNoPlaceholder(portfolio.name, "name");
  assertNoPlaceholder(portfolio.title, "title");
  assertNoPlaceholder(portfolio.summary, "summary");
  assertSourceContains(source, portfolio.name, "name");

  if (portfolio.contact.email) {
    assertNoPlaceholder(portfolio.contact.email, "contact.email");
    assertSourceContains(source, portfolio.contact.email, "contact.email");
  }

  if (portfolio.contact.phone) {
    assertNoPlaceholder(portfolio.contact.phone, "contact.phone");
    assertSourceContains(source, portfolio.contact.phone, "contact.phone");
  }

  if (portfolio.contact.location) {
    assertSourceContains(source, portfolio.contact.location, "contact.location");
  }

  for (let index = 0; index < portfolio.education.length; index += 1) {
    const education = portfolio.education[index];
    assertNoPlaceholder(education.institution, `education[${index}].institution`);
    assertNoPlaceholder(education.degree, `education[${index}].degree`);
    assertSourceContains(source, education.institution, `education[${index}].institution`);
    assertSourceContains(source, education.degree, `education[${index}].degree`);
    assertSourceContainsDateHints(source, education.period, `education[${index}].period`);
  }

  for (let index = 0; index < portfolio.experiences.length; index += 1) {
    const experience = portfolio.experiences[index];
    assertNoPlaceholder(experience.company, `experiences[${index}].company`);
    assertNoPlaceholder(experience.role, `experiences[${index}].role`);
    assertSourceContains(source, experience.company, `experiences[${index}].company`);
    assertSourceContains(source, experience.role, `experiences[${index}].role`);
    assertSourceContainsDateHints(source, experience.years, `experiences[${index}].years`);

    if (experience.summary) {
      assertNoPlaceholder(experience.summary, `experiences[${index}].summary`);
    }
  }

  for (let index = 0; index < portfolio.skills.length; index += 1) {
    const skill = portfolio.skills[index];
    assertNoPlaceholder(skill, `skills[${index}]`);
  }

  for (let index = 0; index < portfolio.projects.length; index += 1) {
    const project = portfolio.projects[index];
    assertNoPlaceholder(project.name, `projects[${index}].name`);
    assertNoPlaceholder(project.description, `projects[${index}].description`);
  }

  return portfolio;
}

export function parsePortfolioWithResumeValidation(
  raw: unknown,
  resumeText: string,
): Portfolio {
  const parsed = PortfolioSchema.parse(raw);
  return validatePortfolioAgainstResumeText(parsed, resumeText);
}
