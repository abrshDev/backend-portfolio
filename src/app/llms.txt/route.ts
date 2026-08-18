import data from "@/data/portfolio.json";

export const dynamic = "force-static";

export function GET() {
  const p = data.personal;
  const fullName = `${p.name.first} ${p.name.last}`;
  const siteUrl = process.env.SITE_URL || "https://localhost:3000";

  const lines: string[] = [
    `# ${fullName}`,
    "",
    `> ${p.title}. ${p.bio}`,
    "",
    "## About",
    "",
    `${fullName} is a full-stack software engineer with 3+ years of professional and freelance experience. He builds end-to-end web applications with an emphasis on scalable backend systems, microservices, and reliable data infrastructure.`,
    "",
    `${p.currentWork.text} ${p.currentWork.url ? `[${p.currentWork.company}](${p.currentWork.url})` : p.currentWork.company}. ${data.contact.message}`,
    "",
    `- Website: ${siteUrl}`,
    `- Email: ${p.email}`,
    `- Location: ${p.location}`,
    `- Resume: ${siteUrl}${p.resumePath}`,
    "",
    "## Links",
    "",
    ...data.socials.map(
      (s: { label: string; url: string }) => `- ${s.label}: ${s.url}`
    ),
    "",
    "## Skills",
    "",
    ...Object.entries(data.skills).flatMap(([category, items]) => [
      `### ${category}`,
      (items as string[]).join(", "),
      "",
    ]),
    "## Experience",
    "",
    ...data.experience.flatMap((e) => [
      `### ${e.role} (${e.tag}) — ${e.company}`,
      [e.period, e.location].filter(Boolean).join(" | "),
      "",
      ...e.points.map((pt) => `- ${pt}`),
      "",
    ]),
    "## Education",
    "",
    ...data.education.flatMap((e) => [
      `### ${e.degree} — ${e.institution}`,
      [e.period, e.location, e.grade].filter(Boolean).join(" | "),
      "",
      ...(e.coursework.length > 0 ? [`Coursework: ${e.coursework.join(", ")}`] : []),
      "",
    ]),
    "## Projects",
    "",
    ...data.projects.flatMap((proj) => [
      `### ${proj.name} — ${proj.description}`,
      `Tech: ${proj.tech.join(", ")}`,
      ...(proj.url ? [`Project: ${proj.url}`] : []),
      "",
      ...proj.points.map((pt) => `- ${pt}`),
      "",
    ]),
    "## Achievements",
    "",
    ...data.achievements.map((a) => `- ${a}`),
    "",
    "## Activities",
    "",
    ...data.activities.flatMap(
      (a: {
        title: string;
        description: string;
        items?: string[];
        url?: string;
      }) => [
        `### ${a.title}`,
        a.description,
        ...(a.items ? a.items.map((i) => `- ${i}`) : []),
        ...(a.url ? [`Read more: ${a.url}`] : []),
        "",
      ]
    ),
    "## Contact",
    "",
    data.contact.message,
    "",
    `- Email: ${p.email}`,
    `- Phone: ${p.phone}`,
    ...(data.contact.calendlyUrl
      ? [`- Schedule a call: ${data.contact.calendlyUrl}`]
      : []),
    "",
    ...(p.repoUrl
      ? ["## Source Code", "", `This portfolio is open source: ${p.repoUrl}`, ""]
      : []),
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
