import Link from "next/link";
import { Button } from "@/components/ui/button";
import PostList from "@/components/lists/PostList";

function MainPage() {
  return (
    <>
      <section className="mt-4">
        <PostList />
      </section>

      <Button asChild size="sm" className="w-full mt-4">
        <Link href="/post-write">Post Write</Link>
      </Button>
    </>
  );
}

export default MainPage;
