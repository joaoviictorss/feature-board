import { IssuesListResponseSchema } from "@/api/routes/list-issues";
import { clientEnv } from "@/client-env";

interface ListIssuesProps {
  search?: string;
}

export const listIssues = async ({ search }: ListIssuesProps) => {
  try {
    const url = new URL(`/api/issues`, clientEnv.NEXT_PUBLIC_API_URL);

    if (search) {
      url.searchParams.set("search", search);
    }

    const response = await fetch(url);

    const data = await response.json();

    return IssuesListResponseSchema.parse(data);
  } catch (error) {
    console.error("Error listing issues:", error);
    throw error;
  }
};
