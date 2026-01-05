import { getIssue } from "@/services/get-issue";
import { ArchiveIcon, MoveLeftIcon } from "lucide-react";
import Link from "next/link";
import { IssueCommentsList } from "../_components/issue-coments-list";
import { Suspense } from "react";
import { IssueCommentsSkeleton } from "../_components/issue-comments-skeleton";
import { IssueLikeButton } from "../_components/issue-like-button";
import {
  CreateCommentSchema,
  IssueCommentForm,
} from "../_components/issue-comment-form";
import { createComment } from "@/services/create-comment";
import { authClient } from "@/lib/auth-client";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

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

  const { data: session } = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  const isAuthenticated = !!session?.user;

  const issue = await getIssue({ id });

  const statusLabels = {
    backlog: "Backlog",
    todo: "Para Fazer",
    in_progress: "Em Progresso",
    done: "Concluído",
  } as const;

  const handleCreateComment = async (data: CreateCommentSchema) => {
    "use server";

    await createComment({ issueId: id, text: data.text });

    revalidatePath(`/issues/${id}`);
  };

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

        <IssueLikeButton issueId={issue.id} />
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">{issue.title}</h1>
        <p className="text-sm text-navy-100 leading-relaxed ">
          {issue.description}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <span className="font-semibold ">Comentários</span>

        <IssueCommentForm
          onCreateComment={handleCreateComment}
          isAuthenticated={isAuthenticated}
        />

        <div className="mt-3">
          <Suspense fallback={<IssueCommentsSkeleton />}>
            <IssueCommentsList issueId={id} />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
