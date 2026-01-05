import { Skeleton } from "@/components/skeleton";
import { Section } from "@/components/section";

export default function BoardLoading() {
  return (
    <div className="grid grid-cols-4 gap-5 flex-1 items-stretch">
      {/* Backlog Skeleton */}
      <Section.Container>
        <Section.Header>
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-4 w-6" />
        </Section.Header>
        <Section.Content>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-navy-700 border-[0.5px] border-navy-600 p-3 space-y-4 rounded"
            >
              <div className="flex flex-col gap-2">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-4 w-full" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-6 w-12" />
                <Skeleton className="h-6 w-12" />
              </div>
            </div>
          ))}
        </Section.Content>
      </Section.Container>

      {/* Todo Skeleton */}
      <Section.Container>
        <Section.Header>
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-4 w-6" />
        </Section.Header>
        <Section.Content>
          {[1, 2].map((i) => (
            <div
              key={i}
              className="bg-navy-700 border-[0.5px] border-navy-600 p-3 space-y-4 rounded"
            >
              <div className="flex flex-col gap-2">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-4 w-full" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-6 w-12" />
                <Skeleton className="h-6 w-12" />
              </div>
            </div>
          ))}
        </Section.Content>
      </Section.Container>

      {/* In Progress Skeleton */}
      <Section.Container>
        <Section.Header>
          <Skeleton className="h-6 w-28" />
          <Skeleton className="h-4 w-6" />
        </Section.Header>
        <Section.Content>
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-navy-700 border-[0.5px] border-navy-600 p-3 space-y-4 rounded"
            >
              <div className="flex flex-col gap-2">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-4 w-full" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-6 w-12" />
                <Skeleton className="h-6 w-12" />
              </div>
            </div>
          ))}
        </Section.Content>
      </Section.Container>

      {/* Done Skeleton */}
      <Section.Container>
        <Section.Header>
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-4 w-6" />
        </Section.Header>
        <Section.Content>
          {[1, 2].map((i) => (
            <div
              key={i}
              className="bg-navy-700 border-[0.5px] border-navy-600 p-3 space-y-4 rounded"
            >
              <div className="flex flex-col gap-2">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-4 w-full" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-6 w-12" />
                <Skeleton className="h-6 w-12" />
              </div>
            </div>
          ))}
        </Section.Content>
      </Section.Container>
    </div>
  );
}
