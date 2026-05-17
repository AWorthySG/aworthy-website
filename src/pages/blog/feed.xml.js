export function GET() {
  const posts = [
    { title: "10 O-Level English Tips to Score A1 in 2026", slug: "o-level-english-tips-2026", date: "2026-05-15", description: "Actionable tips for Paper 1 and Paper 2 to help you score A1 in the 2026 O-Level English exam." },
    { title: "GP Essay Examples: 5 Model Introductions That Score", slug: "gp-essay-examples", date: "2026-05-12", description: "Five model GP essay introductions across Technology, Environment, Media, Globalisation, and Arts with technique breakdowns." },
    { title: "H2 Economics Case Study: How to Score L3 Every Time", slug: "h2-econs-case-study-tips", date: "2026-05-10", description: "Step-by-step approach to A-Level Economics case study questions with a worked example." },
    { title: "The 12-Week Exam Prep Timeline", slug: "exam-prep-timeline", date: "2026-04-20", description: "A structured 12-week revision plan for O-Level and A-Level students." },
    { title: "Why Smart Students Still Fail Exams", slug: "why-smart-students-fail", date: "2026-04-15", description: "The gap between knowledge and exam technique, and how to bridge it." },
    { title: "Situational Writing: The Complete Format Guide", slug: "situational-writing-guide", date: "2026-04-10", description: "Format conventions for formal letter, email, report, and speech with register tips." },
    { title: "Economics Essay Diagrams: When and How to Use Them", slug: "economics-essay-diagrams", date: "2026-03-25", description: "Guide to selecting and drawing the right diagrams in H2 Economics essays." },
    { title: "GP Essay Structure: The Framework That Gets A", slug: "gp-essay-structure", date: "2026-03-15", description: "The CASE Method framework for structuring GP essays that consistently score well." },
    { title: "Comprehension Techniques That Actually Work", slug: "comprehension-techniques", date: "2026-03-01", description: "Practical techniques for literal, inferential, and evaluative comprehension questions." },
  ];

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>A-Worthy Blog — O-Level English, GP &amp; Economics Tips</title>
    <description>Free study tips, exam strategies, and model answers for O-Level English, H1 General Paper, and H2 Economics from A-Worthy Singapore.</description>
    <link>https://a-worthy.com/blog/</link>
    <atom:link href="https://a-worthy.com/blog/feed.xml" rel="self" type="application/rss+xml"/>
    <language>en-sg</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${posts.map(post => `    <item>
      <title>${post.title}</title>
      <link>https://a-worthy.com/blog/${post.slug}/</link>
      <guid>https://a-worthy.com/blog/${post.slug}/</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description>${post.description}</description>
    </item>`).join('\n')}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: { 'Content-Type': 'application/xml' }
  });
}
