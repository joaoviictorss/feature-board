import { CommentsListResponseSchema } from "@/api/routes/list-issue-comments";
import { clientEnv } from "@/client-env";
import { cacheLife, cacheTag } from "next/cache";

interface ListIssueCommentsParams {
  issueId: string;
}

export const listIssueComments = async ({
  issueId,
}: ListIssueCommentsParams) => {
  "use cache";

  cacheLife("minutes");
  cacheTag(`issue-comments-${issueId}`);

  try {
    const url = new URL(
      `/api/issues/${issueId}/comments`,
      clientEnv.NEXT_PUBLIC_API_URL
    );

    const response = await fetch(url);

    const data = await response.json();

    return CommentsListResponseSchema.parse(data);
  } catch (error) {
    console.error("Error listing issue comments:", error);
    throw error;
  }
};
