import { Container } from "@/components/ui/Button";

export function LogosRow({
  label = "Trusted by innovative companies",
  logos,
}: {
  label?: string;
  logos: string[];
}) {
  return (
    <div className="bg-bg-muted py-10">
      <Container>
        <p className="text-center text-xs font-semibold tracking-wide text-slate-400 uppercase">{label}</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
          {logos.map((logo) => (
            <span key={logo} className="text-lg font-bold tracking-tight text-slate-400 select-none">
              {logo}
            </span>
          ))}
        </div>
      </Container>
    </div>
  );
}
