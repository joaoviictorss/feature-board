import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { Section } from "@/components/section";
import { ArchiveIcon, MessageCircleIcon, ThumbsUpIcon } from "lucide-react";

interface HomeProps {
  searchParams: Promise<SearchParams>;
}

interface SearchParams {
  q?: string;
}

export default async function Home({ searchParams }: HomeProps) {
  const { q } = await searchParams;

  console.log(q);

  return (
    <div className="grid grid-cols-4 gap-5 flex-1 items-stretch">
      <Section.Container>
        <Section.Header>
          <Section.Title>
            <ArchiveIcon className="size=3" />
            Backlog
          </Section.Title>
          <Section.IssueCount>12</Section.IssueCount>
        </Section.Header>

        <Section.Content>
          <Card.Container href="/">
            <Card.Header>
              <Card.Number>ECO-001</Card.Number>
              <Card.Title>Refatorar o componente de card</Card.Title>
            </Card.Header>
            <Card.Footer>
              <Button type="button">
                <ThumbsUpIcon className="size-3" />
                <span className="text-sm">12</span>
              </Button>
              <Button type="button">
                <MessageCircleIcon className="size-3" />
                <span className="text-sm">5</span>
              </Button>
            </Card.Footer>
          </Card.Container>
        </Section.Content>
      </Section.Container>
    </div>
  );
}
