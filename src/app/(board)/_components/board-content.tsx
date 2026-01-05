"use client";

import { IssuesListResponseSchema } from "@/api/routes/list-issues";
import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { LikeButton } from "@/components/like-button";
import { Section } from "@/components/section";
import { getIssueInteractions } from "@/services/get-issue-interactions";
import { listIssues } from "@/services/list-issues";
import { useQuery } from "@tanstack/react-query";
import { ArchiveIcon, MessageCircleIcon, ThumbsUpIcon } from "lucide-react";
import { ComponentProps, useMemo } from "react";
import z from "zod";

interface BoardContentProps extends ComponentProps<"div"> {
  issues: z.infer<typeof IssuesListResponseSchema>;
}

export const BoardContent = ({ issues, ...props }: BoardContentProps) => {
  const allIssuesIds = [
    ...issues.backlog.map((issue) => issue.id),
    ...issues.todo.map((issue) => issue.id),
    ...issues.in_progress.map((issue) => issue.id),
    ...issues.done.map((issue) => issue.id),
  ];

  const { data: issuesInteractions, isLoading: isLoadingIssuesInteractions } =
    useQuery({
      queryKey: ["issue-likes", allIssuesIds.sort().join(",")],
      queryFn: () => getIssueInteractions({ issueIds: allIssuesIds }),
    });

  const interactions = useMemo(() => {
    if (!issuesInteractions)
      return new Map<string, { isLiked: boolean; likesCount: number }>();

    return new Map<string, { isLiked: boolean; likesCount: number }>(
      issuesInteractions.interactions.map((interaction) => [
        interaction.issueId,
        { isLiked: interaction.isLiked, likesCount: interaction.likesCount },
      ])
    );
  }, [issuesInteractions]);

  return (
    <div className="grid grid-cols-4 gap-5 flex-1 items-stretch" {...props}>
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
            issues.backlog.map((issue) => {
              const interaction = interactions.get(issue.id);

              return (
                <Card.Container href={`/issues/${issue.id}`} key={issue.id}>
                  <Card.Header>
                    <Card.Number>{issue.issueNumber}</Card.Number>
                    <Card.Title>{issue.title}</Card.Title>
                  </Card.Header>
                  <Card.Footer>
                    <LikeButton
                      issueId={issue.id}
                      initialLikes={interaction?.likesCount ?? 0}
                      initialLiked={interaction?.isLiked ?? false}
                    />
                    <Button type="button">
                      <MessageCircleIcon className="size-3" />
                      <span className="text-sm">{issue.comments}</span>
                    </Button>
                  </Card.Footer>
                </Card.Container>
              );
            })
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
            issues.todo.map((issue) => {
              const interaction = interactions.get(issue.id);
              return (
                <Card.Container href={`/issues/${issue.id}`} key={issue.id}>
                  <Card.Header>
                    <Card.Number>{issue.issueNumber}</Card.Number>
                    <Card.Title>{issue.title}</Card.Title>
                  </Card.Header>
                  <Card.Footer>
                    <LikeButton
                      issueId={issue.id}
                      initialLikes={interaction?.likesCount ?? 0}
                      initialLiked={interaction?.isLiked ?? false}
                    />
                    <Button type="button">
                      <MessageCircleIcon className="size-3" />
                      <span className="text-sm">{issue.comments}</span>
                    </Button>
                  </Card.Footer>
                </Card.Container>
              );
            })
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
            issues.in_progress.map((issue) => {
              const interaction = interactions.get(issue.id);
              return (
                <Card.Container href={`/issues/${issue.id}`} key={issue.id}>
                  <Card.Header>
                    <Card.Number>{issue.issueNumber}</Card.Number>
                    <Card.Title>{issue.title}</Card.Title>
                  </Card.Header>
                  <Card.Footer>
                    <LikeButton
                      issueId={issue.id}
                      initialLikes={interaction?.likesCount ?? 0}
                      initialLiked={interaction?.isLiked ?? false}
                    />
                    <Button type="button">
                      <MessageCircleIcon className="size-3" />
                      <span className="text-sm">{issue.comments}</span>
                    </Button>
                  </Card.Footer>
                </Card.Container>
              );
            })
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
            issues.done.map((issue) => {
              const interaction = interactions.get(issue.id);
              return (
                <Card.Container href={`/issues/${issue.id}`} key={issue.id}>
                  <Card.Header>
                    <Card.Number>{issue.issueNumber}</Card.Number>
                    <Card.Title>{issue.title}</Card.Title>
                  </Card.Header>
                  <Card.Footer>
                    <LikeButton
                      issueId={issue.id}
                      initialLikes={interaction?.likesCount ?? 0}
                      initialLiked={interaction?.isLiked ?? false}
                    />
                    <Button type="button">
                      <MessageCircleIcon className="size-3" />
                      <span className="text-sm">{issue.comments}</span>
                    </Button>
                  </Card.Footer>
                </Card.Container>
              );
            })
          )}
        </Section.Content>
      </Section.Container>
    </div>
  );
};
