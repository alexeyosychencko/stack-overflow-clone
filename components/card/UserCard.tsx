import Image from "next/image";
import { ReactElement } from "react";
import { getTagsByUserId } from "@/database/actions/tag.action";
import { Badge } from "../ui/badge";
import RenderTag from "../shared/RenderTag";
import Link from "next/link";

async function UserCard({
  user
}: {
  user: {
    id: string;
    clerkId: string;
    username: string;
    name: string;
    picture: string;
  };
}): Promise<ReactElement> {
  const tags = await getTagsByUserId(user.id);

  return (
    <article className="shadow-light100_darknone w-full max-xs:min-w-full xs:w-[260px]">
      <div className="background-light900_dark200 light-border flex w-full flex-col items-center justify-center rounded-2xl border p-8">
        <Link href={`/profile/${user.clerkId}`}>
          <Image
            src={user.picture}
            alt="user profile picture"
            width={100}
            height={100}
            className="rounded-full"
          />
        </Link>
        <div className="pt-4 text-center">
          <h3 className="h3-bold text-dark200_light900 line-clamp-1">
            <Link href={`/profile/${user.clerkId}`}>{user.name}</Link>
          </h3>
          <p className="body-regular text-dark500_light500 mt-2">
            @{user.username}
          </p>
        </div>
        <div className="mt-5">
          {tags.length ? (
            <div className="flex items-center gap-2">
              {tags.map((tag) => (
                <RenderTag key={tag.id} id={tag.id} name={tag.name} />
              ))}
            </div>
          ) : (
            <Badge>No tags yet</Badge>
          )}
        </div>
      </div>
    </article>
  );
}

export default UserCard;
