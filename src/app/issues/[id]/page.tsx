import { Button } from "@/components/button";
import { getIssue } from "@/services/get-issue";
import {
  ArchiveIcon,
  MessageCirclePlusIcon,
  MoveLeftIcon,
  ThumbsUpIcon,
} from "lucide-react";
import Link from "next/link";
import { IssueCommentsList } from "../_components/issue-coments-list";
import { Suspense } from "react";
import { IssueCommentsSkeleton } from "../_components/issue-comments-skeleton";
import { Input } from "@/components/input";

export const generateMetadata = async ({ params }: IssuePageProps) => {
  const { id } = await params;

  const issue = await getIssue({ id });

  return {
    title: issue.title,
    description: issue.description,
  };
};

interface IssuePageProps {
  params: Promise<{ id: string }>;
}

export default async function IssuePage({ params }: IssuePageProps) {
  const { id } = await params;

  const issue = await getIssue({ id });

  const statusLabels = {
    backlog: "Backlog",
    todo: "Para Fazer",
    in_progress: "Em Progresso",
    done: "Concluído",
  } as const;

  return (
    <main className="max-w-[900px] mx-auto w-full flex flex-col gap-4 p-6 bg-navy-800 border-[0.5px] border-navy-500 rounded-xl">
      <Link
        href="/"
        className="flex items-center gap-2 text-navy-200 hover:text-navy-100 transition-colors duration-150"
      >
        <MoveLeftIcon className="size-4" />

        <span className="text-xs">Voltar</span>
      </Link>

      <div className="flex items-center gap-2">
        <span className="bg-navy-700 rounded-lg px-3 py-1.5 flex items-center gap-2 text-xs">
          <ArchiveIcon className="size-3" />
          {statusLabels[issue.status]}
        </span>

        <Button type="button">
          <ThumbsUpIcon className="size-3" />
          <span className="text-sm">{issue.comments}</span>
        </Button>
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">{issue.title}</h1>
        <p className="text-sm text-navy-100 leading-relaxed ">
          {issue.description}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <span className="font-semibold ">Comentários</span>

        <form className="relative w-full">
          <Input
            className="bg-navy-700 h-11 pr-24 w-full"
            placeholder="Leave a comment..."
          />
          <button
            type="submit"
            className="flex items-center gap-2 text-indigo-400 absolute right-3 top-1/2 -translate-y-1/2 text-xs hover:text-indigo-300 cursor-pointer disabled:opacity-50"
          >
            Publicar
            <MessageCirclePlusIcon className="size-3" />
          </button>
        </form>

        <div className="mt-3">
          <Suspense fallback={<IssueCommentsSkeleton />}>
            <IssueCommentsList issueId={id} />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
