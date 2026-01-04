import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { Section } from "@/components/section";
import { listIssues } from "@/services/list-issues";
import { ArchiveIcon, MessageCircleIcon, ThumbsUpIcon } from "lucide-react";
import { Metadata } from "next";

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

  return (
    <div className="grid grid-cols-4 gap-5 flex-1 items-stretch">
      {/* Backlog */}
      <Section.Container>
        <Section.Header>
          <Section.Title>
            <ArchiveIcon className="size=3" />
            Backlog
          </Section.Title>
          <Section.IssueCount>{issues.backlog.length}</Section.IssueCount>
        </Section.Header>

        <Section.Content>
          {issues.backlog.length === 0 ? (
            <div className="flex items-center justify-center py-8 text-center">
              <p className="text-sm text-navy-300">Nenhuma tarefa encontrada</p>
            </div>
          ) : (
            issues.backlog.map((issue) => (
              <Card.Container href={`/issues/${issue.id}`} key={issue.id}>
                <Card.Header>
                  <Card.Number>{issue.issueNumber}</Card.Number>
                  <Card.Title>{issue.title}</Card.Title>
                </Card.Header>
                <Card.Footer>
                  <Button type="button">
                    <ThumbsUpIcon className="size-3" />
                    <span className="text-sm">{issue.comments}</span>
                  </Button>
                  <Button type="button">
                    <MessageCircleIcon className="size-3" />
                    <span className="text-sm">{issue.comments}</span>
                  </Button>
                </Card.Footer>
              </Card.Container>
            ))
          )}
        </Section.Content>
      </Section.Container>

      {/* Todo */}
      <Section.Container>
        <Section.Header>
          <Section.Title>
            <ArchiveIcon className="size=3" />
            Para Fazer
          </Section.Title>
          <Section.IssueCount>{issues.todo.length}</Section.IssueCount>
        </Section.Header>

        <Section.Content>
          {issues.todo.length === 0 ? (
            <div className="flex items-center justify-center py-8 text-center">
              <p className="text-sm text-navy-300">Nenhuma tarefa encontrada</p>
            </div>
          ) : (
            issues.todo.map((issue) => (
              <Card.Container href={`/issues/${issue.id}`} key={issue.id}>
                <Card.Header>
                  <Card.Number>{issue.issueNumber}</Card.Number>
                  <Card.Title>{issue.title}</Card.Title>
                </Card.Header>
                <Card.Footer>
                  <Button type="button">
                    <ThumbsUpIcon className="size-3" />
                    <span className="text-sm">{issue.comments}</span>
                  </Button>
                  <Button type="button">
                    <MessageCircleIcon className="size-3" />
                    <span className="text-sm">{issue.comments}</span>
                  </Button>
                </Card.Footer>
              </Card.Container>
            ))
          )}
        </Section.Content>
      </Section.Container>

      {/* In Progress */}
      <Section.Container>
        <Section.Header>
          <Section.Title>
            <ArchiveIcon className="size=3" />
            Em Progresso
          </Section.Title>
          <Section.IssueCount>{issues.in_progress.length}</Section.IssueCount>
        </Section.Header>

        <Section.Content>
          {issues.in_progress.length === 0 ? (
            <div className="flex items-center justify-center py-8 text-center">
              <p className="text-sm text-navy-300">Nenhuma tarefa encontrada</p>
            </div>
          ) : (
            issues.in_progress.map((issue) => (
              <Card.Container href={`/issues/${issue.id}`} key={issue.id}>
                <Card.Header>
                  <Card.Number>{issue.issueNumber}</Card.Number>
                  <Card.Title>{issue.title}</Card.Title>
                </Card.Header>
                <Card.Footer>
                  <Button type="button">
                    <ThumbsUpIcon className="size-3" />
                    <span className="text-sm">{issue.comments}</span>
                  </Button>
                  <Button type="button">
                    <MessageCircleIcon className="size-3" />
                    <span className="text-sm">{issue.comments}</span>
                  </Button>
                </Card.Footer>
              </Card.Container>
            ))
          )}
        </Section.Content>
      </Section.Container>

      {/* Done */}
      <Section.Container>
        <Section.Header>
          <Section.Title>
            <ArchiveIcon className="size=3" />
            Concluídos
          </Section.Title>
          <Section.IssueCount>{issues.done.length}</Section.IssueCount>
        </Section.Header>

        <Section.Content>
          {issues.done.length === 0 ? (
            <div className="flex items-center justify-center py-8 text-center">
              <p className="text-sm text-navy-300">Nenhuma tarefa encontrada</p>
            </div>
          ) : (
            issues.done.map((issue) => (
              <Card.Container href={`/issues/${issue.id}`} key={issue.id}>
                <Card.Header>
                  <Card.Number>{issue.issueNumber}</Card.Number>
                  <Card.Title>{issue.title}</Card.Title>
                </Card.Header>
                <Card.Footer>
                  <Button type="button">
                    <ThumbsUpIcon className="size-3" />
                    <span className="text-sm">{issue.comments}</span>
                  </Button>
                  <Button type="button">
                    <MessageCircleIcon className="size-3" />
                    <span className="text-sm">{issue.comments}</span>
                  </Button>
                </Card.Footer>
              </Card.Container>
            ))
          )}
        </Section.Content>
      </Section.Container>
    </div>
  );
}
