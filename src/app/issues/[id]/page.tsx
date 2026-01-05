import { getIssue } from "@/services/get-issue";
import { MoveLeftIcon } from "lucide-react";
import Link from "next/link";
import { IssueDetails } from "../_components/issue-details";

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

  return (
    <main className="max-w-[900px] mx-auto w-full flex flex-col gap-4 p-6 bg-navy-800 border-[0.5px] border-navy-500 rounded-xl">
      <Link
        href="/"
        className="flex items-center gap-2 text-navy-200 hover:text-navy-100 transition-colors duration-150"
      >
        <MoveLeftIcon className="size-4" />

        <span className="text-xs">Voltar</span>
      </Link>

      <IssueDetails issueId={id} />
    </main>
  );
}
