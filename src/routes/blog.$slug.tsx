import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import ReactMarkdown from "react-markdown";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getPostBySlug } from "@/lib/blog.functions";

const postQO = (slug: string) =>
  queryOptions({
    queryKey: ["blog", "post", slug],
    queryFn: () => getPostBySlug({ data: { slug } }),
  });

export const Route = createFileRoute("/blog/$slug")({
  head: ({ loaderData }: { loaderData?: { title: string; excerpt: string | null; cover_image: string | null } }) => ({
    meta: [
      { title: loaderData ? `${loaderData.title} — Blog` : "Article" },
      { name: "description", content: loaderData?.excerpt ?? "Inter-Cleaning Services blog." },
      { property: "og:title", content: loaderData?.title ?? "Article" },
      { property: "og:description", content: loaderData?.excerpt ?? "" },
      ...(loaderData?.cover_image ? [{ property: "og:image", content: loaderData.cover_image }] : []),
    ],
  }),
  loader: async ({ params, context }) => {
    const post = await context.queryClient.ensureQueryData(postQO(params.slug));
    if (!post) throw notFound();
    return post;
  },
  component: BlogPost,
  errorComponent: ({ error }) => (
    <div className="p-12 text-center text-charcoal/70">Couldn't load: {error.message}</div>
  ),
  notFoundComponent: () => (
    <div className="min-h-screen grid place-items-center">
      <div className="text-center">
        <h1 className="font-heading text-4xl font-bold mb-4">Article not found</h1>
        <Link to="/blog" className="text-magenta font-bold">← Back to blog</Link>
      </div>
    </div>
  ),
});

function BlogPost() {
  const { slug } = Route.useParams();
  const { data: post } = useSuspenseQuery(postQO(slug));
  if (!post) return null;

  return (
    <div className="bg-white min-h-screen text-charcoal">
      <Header />
      <article className="max-w-3xl mx-auto px-6 pt-16 pb-24">
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-bold text-magenta mb-8 hover:gap-3 transition-all">
          <ArrowLeft className="w-4 h-4" /> All articles
        </Link>
        <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-charcoal/40 mb-4">
          {post.published_at ? new Date(post.published_at).toLocaleDateString() : ""}
          {post.author_name ? ` · ${post.author_name}` : ""}
        </div>
        <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight mb-8 leading-tight">
          {post.title}
        </h1>
        {post.cover_image && (
          <img
            src={post.cover_image}
            alt={post.title}
            className="w-full aspect-[16/9] object-cover rounded-3xl mb-10 ring-1 ring-charcoal/10"
          />
        )}
        <div className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:font-bold prose-a:text-magenta">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </article>
      <Footer />
    </div>
  );
}
