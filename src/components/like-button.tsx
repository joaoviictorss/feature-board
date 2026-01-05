import { ComponentProps, MouseEvent, useState } from "react";
import { Button } from "./button";
import { ThumbsUpIcon } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleLike } from "@/services/toggle-like";
import type { IssueInteractionsResponseSchema } from "@/api/routes/schemas/issue-interactions";
import z from "zod";

interface LikeButtonProps extends ComponentProps<"button"> {
  issueId: string;
  initialLikes: number;
  initialLiked?: boolean;
}

type IssueInteractionsResponse = z.infer<
  typeof IssueInteractionsResponseSchema
>;

export const LikeButton = ({
  issueId,
  initialLikes,
  initialLiked = false,
  ...props
}: LikeButtonProps) => {
  const queryClient = useQueryClient();

  const { mutate: onToggleLike, isPending } = useMutation({
    mutationFn: () => toggleLike({ issueId }),
    onMutate: async () => {
      const previousData =
        queryClient.getQueriesData<IssueInteractionsResponse>({
          queryKey: ["issue-likes"],
        });

      queryClient.setQueriesData(
        {
          queryKey: ["issue-likes"],
        },
        (old: IssueInteractionsResponse) => {
          if (!old) return undefined;

          return {
            ...old,
            interactions: old.interactions.map((interaction) => {
              if (interaction.issueId === issueId) {
                return {
                  ...interaction,
                  isLiked: !interaction.isLiked,
                  likesCount: interaction.isLiked
                    ? interaction.likesCount - 1
                    : interaction.likesCount + 1,
                };
              }
              return interaction;
            }),
          };
        }
      );

      return { previousData };
    },
    onError: (error, _params, context) => {
      console.error(error);

      if (context?.previousData) {
        for (const [queryKey, data] of context.previousData) {
          queryClient.setQueryData(queryKey, data);
        }
      }
    },
  });

  const handleToggleLike = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    onToggleLike();
  };

  const liked = initialLiked;

  return (
    <Button
      data-liked={liked}
      type="button"
      aria-label={liked ? "Descurtir" : "Curtir"}
      disabled={isPending}
      onClick={(e) => {
        handleToggleLike(e);
      }}
      className="data-[liked=true]:bg-indigo-600 data-[liked=true]:text-white data-[liked=true]:hover:bg-indigo-500 transition-colors duration-150"
      {...props}
    >
      <ThumbsUpIcon className={"size-3"} />
      <span className="text-sm">{initialLikes}</span>
    </Button>
  );
};
