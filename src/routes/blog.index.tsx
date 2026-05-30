import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { listPublishedPosts } from "@/lib/blog.functions";

const postsQO = queryOptions({
  queryKey: ["blog", "published"],
  queryFn: () => listPublishedPosts(),
});

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog — Inter-Cleaning Services" },
      { name: "description", content: "Cleaning tips, news and insights from Inter-Cleaning Services." },
      { property: "og:title", content: "Blog — Inter-Cleaning Services" },
      { property: "og:description", content: "Cleaning tips, news and insights." },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(postsQO),
  component: BlogIndex,
  errorComponent: ({ error }) => (
    <div className="p-12 text-center text-charcoal/70">Couldn't load blog: {error.message}</div>
  ),
  notFoundComponent: () => <div>Not found</div>,
});

function BlogIndex() {
  const { data: posts } = useSuspenseQuery(postsQO);

  return (
    <div className="bg-white min-h-screen text-charcoal">
      <Header />
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-12">
        <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-magenta block mb-4">Blog</span>
        <h1 className="font-heading text-5xl md:text-6xl font-bold tracking-tight mb-6">
          Cleaning insights &{" "}
          <span className="bg-gradient-to-r from-magenta to-orange bg-clip-text text-transparent">stories</span>.
        </h1>
        <p className="text-charcoal/60 text-lg max-w-2xl">
          Tips, behind-the-scenes and news from our team across the Greater Toronto Area.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-24">
        {posts.length === 0 ? (
          <div className="py-20 text-center text-charcoal/50">No articles yet — check back soon.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((p) => (
              <Link
                key={p.id}
                to="/blog/$slug"
                params={{ slug: p.slug }}
                className="group bg-white rounded-3xl ring-1 ring-charcoal/5 overflow-hidden hover:-translate-y-1 hover:shadow-[0_30px_60px_-20px_rgba(0,0,0,0.2)] transition-all flex flex-col"
              >
                <div className="aspect-[16/10] bg-zinc-100 overflow-hidden">
                  {p.cover_image ? (
                    <img
                      src={p.cover_image}
                      alt={p.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-magenta/20 via-orange/10 to-yellow/20" />
                  )}
                </div>
                <div className="p-7 flex flex-col flex-1">
                  <div className="text-[11px] font-bold uppercase tracking-[0.25em] text-charcoal/40 mb-3">
                    {p.published_at ? new Date(p.published_at).toLocaleDateString() : ""}
                  </div>
                  <h2 className="font-heading text-xl font-bold mb-3 leading-tight group-hover:text-magenta transition-colors">
                    {p.title}
                  </h2>
                  {p.excerpt && <p className="text-sm text-charcoal/60 leading-relaxed flex-1">{p.excerpt}</p>}
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
}
