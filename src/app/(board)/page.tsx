import { listIssues } from "@/services/list-issues";
import { Metadata } from "next";
import { BoardContent } from "./_components/board-content";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Board",
    description:
      "Acompanhe o progresso do desenvolvimento de toda a nossa plataforma.",
  };
};

interface HomeProps {
  searchParams: Promise<SearchParams>;
}

interface SearchParams {
  q?: string;
}

export default async function Home({ searchParams }: HomeProps) {
  const { q } = await searchParams;

  const issues = await listIssues({ search: q });

  return <BoardContent issues={issues} />;
}
