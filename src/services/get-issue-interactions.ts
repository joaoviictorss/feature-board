import { IssueInteractionsResponseSchema } from "@/api/routes/schemas/issue-interactions";
import { clientEnv } from "@/client-env";

interface GetIssueInteractionsProps {
  issueIds: string[];
}

export const getIssueInteractions = async ({
  issueIds,
}: GetIssueInteractionsProps) => {
  try {
    const url = new URL(
      `/api/issues/interactions`,
      clientEnv.NEXT_PUBLIC_API_URL
    );

    url.searchParams.set("issueIds", issueIds.join(","));

    const response = await fetch(url, {
      credentials: "include",
    });

    const data = await response.json();

    return IssueInteractionsResponseSchema.parse(data);

  } catch (error) {
    console.error("Error getting issue interactions:", error);
    throw error;
  }
};
