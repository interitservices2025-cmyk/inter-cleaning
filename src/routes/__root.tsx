import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-heading font-bold text-gradient-brand">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-gradient-brand px-6 py-3 text-sm font-bold uppercase tracking-wider text-white"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full bg-gradient-brand px-6 py-3 text-sm font-bold uppercase tracking-wider text-white"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-charcoal px-6 py-3 text-sm font-bold uppercase tracking-wider text-charcoal hover:bg-charcoal hover:text-white transition-colors"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Inter-Cleaning Services — Premium Cleaning in the GTA" },
      {
        name: "description",
        content:
          "Excellence in every sweep. Residential, office and specialty cleaning services across the Greater Toronto Area.",
      },
      { name: "author", content: "Inter-Cleaning Services" },
      { property: "og:site_name", content: "Inter-Cleaning Services" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#DC0D73" },
      { property: "og:title", content: "Inter-Cleaning Services — Premium Cleaning in the GTA" },
      { name: "twitter:title", content: "Inter-Cleaning Services — Premium Cleaning in the GTA" },
      { name: "description", content: "A professional website redesign for a cleaning service, featuring a modern look and updated service offerings." },
      { property: "og:description", content: "A professional website redesign for a cleaning service, featuring a modern look and updated service offerings." },
      { name: "twitter:description", content: "A professional website redesign for a cleaning service, featuring a modern look and updated service offerings." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/757fc73f-be71-4fba-a977-4e4cade3579e/id-preview-83635bbd--f5c0edc1-6e42-4d05-8ead-c66f83376de5.lovable.app-1780001278518.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/757fc73f-be71-4fba-a977-4e4cade3579e/id-preview-83635bbd--f5c0edc1-6e42-4d05-8ead-c66f83376de5.lovable.app-1780001278518.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700;800&family=Open+Sans:wght@300;400;500;600&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Inter-Cleaning Services",
          image: "/og.jpg",
          telephone: "+1-416-871-9045",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Brampton",
            addressRegion: "ON",
            postalCode: "L6W 3L3",
            addressCountry: "CA",
          },
          areaServed: "Greater Toronto Area",
          priceRange: "$$",
          sameAs: [
            "https://web.facebook.com/intercleaningservices",
            "https://www.instagram.com/intercleaningservices01/",
            "https://www.linkedin.com/company/inter-cleaningservices",
          ],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <Toaster richColors position="top-right" />
    </QueryClientProvider>
  );
}
