export type Role = "USER" | "ADMIN";

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  createdAt: string;
};

export type Tag = {
  id: string;
  name: string;
};

export type Post = {
  id: string;
  title: string;
  content: string;
  author: User;
  tags: string[];
  createdAt: string;
  updatedAt: string;
};

export type Comment = {
  id: string;
  postId: string;
  text: string;
  author: User;
  createdAt: string;
};

const maya: User = {
  id: "1",
  name: "Maya Ellison",
  email: "maya.ellison@quill.dev",
  role: "ADMIN",
  createdAt: "2023-04-12T15:00:00.000Z",
};

const jonah: User = {
  id: "2",
  name: "Jonah Hale",
  email: "jonah.hale@example.com",
  role: "USER",
  createdAt: "2024-01-19T11:20:00.000Z",
};

const priya: User = {
  id: "3",
  name: "Priya Shah",
  email: "priya.shah@example.com",
  role: "USER",
  createdAt: "2024-06-02T09:05:00.000Z",
};

const luis: User = {
  id: "4",
  name: "Luis Ortega",
  email: "luis.ortega@example.com",
  role: "USER",
  createdAt: "2024-09-15T18:40:00.000Z",
};

const elena: User = {
  id: "5",
  name: "Elena Voss",
  email: "elena.voss@example.com",
  role: "USER",
  createdAt: "2025-02-08T13:15:00.000Z",
};

const samir: User = {
  id: "6",
  name: "Samir Adeyemi",
  email: "samir.adeyemi@example.com",
  role: "USER",
  createdAt: "2025-08-27T16:55:00.000Z",
};

export const users: User[] = [maya, jonah, priya, luis, elena, samir];

/** Signed-in person for this UI preview. Not a session. */
export const currentUser: User = maya;

export const tags: Tag[] = [
  { id: "1", name: "nestjs" },
  { id: "2", name: "prisma" },
  { id: "3", name: "postgres" },
  { id: "4", name: "docker" },
  { id: "5", name: "typescript" },
  { id: "6", name: "testing" },
  { id: "7", name: "auth" },
  { id: "8", name: "api" },
];

function body(paragraphs: string[]) {
  return paragraphs.join("\n\n");
}

export const posts: Post[] = [
  {
    id: "1",
    title: "Getting started with NestJS",
    author: maya,
    tags: ["nestjs", "typescript"],
    createdAt: "2026-10-18T14:00:00.000Z",
    updatedAt: "2026-10-19T09:30:00.000Z",
    content: body([
      "The first NestJS project I kept was the one where I stopped treating the framework like Express with decorators taped on. Modules, providers, and controllers are a map of the application, and the map is the thing worth getting right before the first feature ships.",
      "I start with one module per area of the product: posts, comments, users. Each module owns its controller and its service. Shared pieces, like the Prisma client, live in a module that other modules import. When a file starts reaching across folders for a helper, that is usually the signal to name a real provider.",
      "The habit that saved me later was writing the request shape next to the route on day one. A title, a body, a list of tags. Validation lives with the route, not in a middleware pile I will forget. NestJS is at its best when a new person can open one folder and see how a post is created.",
    ]),
  },
  {
    id: "2",
    title: "Why I switched to Prisma",
    author: jonah,
    tags: ["prisma", "postgres"],
    createdAt: "2026-10-11T16:10:00.000Z",
    updatedAt: "2026-10-11T16:10:00.000Z",
    content: body([
      "I did not switch to Prisma because the query builder was pretty. I switched because the schema became the place the team actually looked. One file described users, posts, comments, and the join table for tags, and the client followed from that.",
      "The migration history is what convinced me to stay. A renamed column used to be a Slack thread and a hope. Now it is a file I can read on the train. I still write raw SQL when a report needs a window function, and Prisma does not mind. The client is the default, not a cage.",
      "What I gave up was a little control over the exact SQL on the simple paths. What I got was a schema review that non-backend people could follow. For a blog, that trade is an easy yes.",
    ]),
  },
  {
    id: "3",
    title: "Postgres indexes that actually matter",
    author: priya,
    tags: ["postgres", "api"],
    createdAt: "2026-10-02T12:00:00.000Z",
    updatedAt: "2026-10-04T08:15:00.000Z",
    content: body([
      "Most of the slow queries I meet are not mysterious. They filter posts by author or sort the feed by created_at, and the table has grown past the point where a sequential scan feels free. The index that matters is the one that matches that exact access path.",
      "On the posts table I keep an index on author_id and another on created_at. Comments are indexed by post_id, because the detail page always asks for one post's thread. I do not index every column someone might someday filter. Unused indexes cost writes, and a blog still has to publish.",
      "Before I add another index I paste the query into EXPLAIN and read it like a paragraph. If the plan already hits the index I wanted, I stop. The interesting work is usually a missing WHERE, not a missing index.",
    ]),
  },
  {
    id: "4",
    title: "A calm Docker setup for local APIs",
    author: luis,
    tags: ["docker", "nestjs"],
    createdAt: "2026-09-21T10:45:00.000Z",
    updatedAt: "2026-09-22T11:00:00.000Z",
    content: body([
      "Local Docker used to mean a compose file I was slightly afraid to edit. The calm version is smaller: Postgres in a container, the API on the host, and a named volume so the data survives a restart. I can read logs without guessing which layer ate my migration.",
      "The API talks to localhost and a published port. That sounds less pure than running everything in the compose network, and it is also how I debug. Breakpoints work. File saves reload NestJS. The database is the only piece that benefits from being boxed up.",
      "I keep a single compose file in the repo and a short comment at the top that says which command to run. New people should not need a tour. They need Postgres, and then they need to write.",
    ]),
  },
  {
    id: "5",
    title: "TypeScript types I reach for every week",
    author: elena,
    tags: ["typescript"],
    createdAt: "2026-09-14T15:20:00.000Z",
    updatedAt: "2026-09-14T15:20:00.000Z",
    content: body([
      "I used to collect clever conditional types the way some people collect stickers. The ones I still reach for are plain. A role is a union of USER and ADMIN. A post's tags are a list of strings. The function that builds a feed takes those shapes and returns them.",
      "What changed my code was naming the shapes once and passing them through, instead of re-describing a post at every boundary. If the title is a string with a limit, the type will not enforce the limit, and that is fine. The type keeps the fields honest. The validation keeps the length honest.",
      "I also stopped using any as a temporary bridge. A temporary any becomes the type of the module. Unknown plus a small parser is slower to write on Tuesday and much faster to change in October.",
    ]),
  },
  {
    id: "6",
    title: "Testing NestJS the way I wish I had started",
    author: samir,
    tags: ["testing", "nestjs", "auth"],
    createdAt: "2026-08-30T09:00:00.000Z",
    updatedAt: "2026-09-01T17:40:00.000Z",
    content: body([
      "My first NestJS tests booted the whole application to check that a title was required. They were slow, and they failed for reasons that had nothing to do with the title. I wish I had started with the service, a fake repository, and one test that says: empty content is rejected.",
      "Controller tests come second, and they stay thin. They check that the route calls the service and that the status code matches the story. Auth gets its own small set: a request without a user is refused, an author can edit, an admin can edit, a stranger cannot. I do not re-test the framework.",
      "The suite I trust is the one I run without thinking. If a test needs a running database, it earns that cost by protecting a query I have already gotten wrong once.",
    ]),
  },
  {
    id: "7",
    title: "Migrations without the 2 a.m. panic",
    author: maya,
    tags: ["prisma", "postgres"],
    createdAt: "2026-08-12T13:30:00.000Z",
    updatedAt: "2026-08-13T08:05:00.000Z",
    content: body([
      "The migrations I fear are the ones that rewrite a table while the app is still writing to it. For a blog that is rarely necessary. Adding a column, adding an index, backfilling in a second step: those can all land while people are reading.",
      "I write the expand step first. The new shape arrives, the old shape still works, and the application starts filling both. Only after that is boring do I remove the old path. Prisma's migration files make the sequence visible, which is the entire point.",
      "I also keep a note in the pull request of how to undo the expand step. If I cannot describe the undo in a sentence, the migration is not ready, no matter how green the checks are.",
    ]),
  },
  {
    id: "8",
    title: "Composing DTOs that stay readable",
    author: jonah,
    tags: ["nestjs", "auth"],
    createdAt: "2026-07-28T11:11:00.000Z",
    updatedAt: "2026-07-29T19:25:00.000Z",
    content: body([
      "A DTO is a promise about the edge of the system. Create post accepts a title, content, and tags. It does not accept an author id from the client, because the author is the person making the request. That single decision removes a whole class of bugs.",
      "I keep the class small enough to read aloud. When a field needs a limit, the limit sits on the field: one hundred and fifty characters for a title. Tags are short names, lowercase, and the list can be empty. Comments are a text body and nothing else.",
      "Readable DTOs also make the admin tools easier. The same user shape shows up in the profile and in the users table. If I am tempted to add a one-off field for a screen, I ask whether the screen is telling the truth about the model.",
    ]),
  },
  {
    id: "9",
    title: "What I log before I reach for a debugger",
    author: priya,
    tags: ["typescript", "testing"],
    createdAt: "2026-07-09T18:00:00.000Z",
    updatedAt: "2026-07-10T09:45:00.000Z",
    content: body([
      "A debugger is a wonderful way to forget what I believed five minutes ago. Before I attach one, I log the request id, the route, the user id, and the decision the code is about to make. On a blog that is usually: who is asking, which post, and whether they are allowed to change it.",
      "I log the shape, not the secrets. A password never lands in a log line, even in development, because copy-paste has a long memory. An email is enough to find the person. A role is enough to explain a 403.",
      "When the log line already answers the question, I close the laptop. The tests I add afterwards pin the decision so the next person does not need my console.",
    ]),
  },
  {
    id: "10",
    title: "Containers, health checks, and a quiet deploy",
    author: luis,
    tags: ["docker"],
    createdAt: "2026-06-18T07:50:00.000Z",
    updatedAt: "2026-06-18T07:50:00.000Z",
    content: body([
      "A quiet deploy is one I do not watch. The container starts, the process listens, and a health check hits a route that does almost nothing except prove the process is up. I keep the database check separate, because a slow query should not restart the API.",
      "The image is boring on purpose. Dependencies install in one layer, the build runs in the next, and the final image does not contain the test suite. Tags are the git sha. Latest is a compliment I do not trust.",
      "When something does fail, I want the previous image still running. Health checks only help if the platform knows how to go back. I write that down next to the Dockerfile so the calm is a plan, not a mood.",
    ]),
  },
  {
    id: "11",
    title: "The query I rewrote three times",
    author: elena,
    tags: ["postgres", "prisma"],
    createdAt: "2026-05-22T20:15:00.000Z",
    updatedAt: "2026-05-24T12:00:00.000Z",
    content: body([
      "The feed query started as select everything. Then it joined authors, then tags, then a count of comments, and then it got slow in a way that felt personal. The third version selects the page of posts first and gathers the rest by id. Ten rows, then their authors, then their tags, then their counts.",
      "Prisma will write the first version for you, and it is the right version while the table is small. The rewrite mattered once the page asked for counts it did not need on every card. A comment count is one number. It does not require the comment text.",
      "I kept the two earlier queries in the commit history instead of deleting them from my notes. Future me always thinks the first version was naive. It was appropriate. The third version is appropriate now.",
    ]),
  },
  {
    id: "12",
    title: "A small style guide for blog APIs",
    author: samir,
    tags: ["api", "testing"],
    createdAt: "2026-04-03T14:35:00.000Z",
    updatedAt: "2026-04-06T10:10:00.000Z",
    content: body([
      "Names in the API match the words we use in the product. A post has a title, content, an author, and tags. A comment has text and an author. A user has a name, an email, and a role. I would rather repeat those words than invent a shorter dialect for JSON.",
      "Errors say what the person can do next. Invalid email or password. A title is required. You do not have access. I keep the sentences short enough to show beside the field that failed, and I do not include a stack trace in anything a reader can see.",
      "The style guide fits on a page because the product fits in a handful of shapes. When a new endpoint needs a new word, we add the word to the page first. The code follows the page, not the other way around.",
    ]),
  },
];

export const comments: Comment[] = [
  {
    id: "c1",
    postId: "1",
    text: "The module-per-area note is the part I needed. My first app was one module and a lot of hope.",
    author: jonah,
    createdAt: "2026-10-18T18:12:00.000Z",
  },
  {
    id: "c2",
    postId: "1",
    text: "Putting validation on the route saved a review last week. We had three different title limits.",
    author: priya,
    createdAt: "2026-10-19T08:02:00.000Z",
  },
  {
    id: "c3",
    postId: "1",
    text: "Do you keep DTOs in the same folder as the controller? I have been splitting them out and I am not sure it helps.",
    author: elena,
    createdAt: "2026-10-19T15:41:00.000Z",
  },
  {
    id: "c4",
    postId: "1",
    text: "Same folder, until the file gets noisy. Then the DTO earns its own file and nothing else moves.",
    author: maya,
    createdAt: "2026-10-19T16:05:00.000Z",
  },
  {
    id: "c5",
    postId: "2",
    text: "The schema-as-the-map argument is what got our team to try Prisma. The client was never the hard part.",
    author: maya,
    createdAt: "2026-10-12T09:18:00.000Z",
  },
  {
    id: "c6",
    postId: "2",
    text: "I still drop to SQL for the feed count. Glad you said that is allowed.",
    author: luis,
    createdAt: "2026-10-12T13:44:00.000Z",
  },
  {
    id: "c7",
    postId: "2",
    text: "Migrations as files I can read on the train is a very specific and correct joy.",
    author: samir,
    createdAt: "2026-10-13T07:22:00.000Z",
  },
  {
    id: "c8",
    postId: "3",
    text: "Indexing created_at for the feed was the one-line fix for us. I had indexed title first, which nobody sorts by.",
    author: elena,
    createdAt: "2026-10-03T11:05:00.000Z",
  },
  {
    id: "c9",
    postId: "3",
    text: "EXPLAIN as a paragraph is a good rule. I have been treating it like a dashboard.",
    author: jonah,
    createdAt: "2026-10-03T19:28:00.000Z",
  },
  {
    id: "c10",
    postId: "3",
    text: "We added a comment count to every card and immediately wanted the index on post_id. This matches what we saw.",
    author: luis,
    createdAt: "2026-10-04T09:12:00.000Z",
  },
  {
    id: "c11",
    postId: "3",
    text: "Unused indexes on a write-heavy comments table were our quiet tax. Thanks for saying it out loud.",
    author: samir,
    createdAt: "2026-10-04T14:47:00.000Z",
  },
  {
    id: "c12",
    postId: "3",
    text: "I am stealing the stop-when-the-plan-is-already-good rule.",
    author: maya,
    createdAt: "2026-10-05T08:03:00.000Z",
  },
  {
    id: "c13",
    postId: "3",
    text: "Partial indexes are the sequel I want, once the basic ones are boring.",
    author: priya,
    createdAt: "2026-10-05T16:36:00.000Z",
  },
  {
    id: "c14",
    postId: "4",
    text: "API on the host, Postgres in Docker is exactly how I work and I thought I was doing it wrong.",
    author: jonah,
    createdAt: "2026-09-21T15:09:00.000Z",
  },
  {
    id: "c15",
    postId: "4",
    text: "A comment at the top of the compose file is such a small thing and it is the whole onboarding.",
    author: elena,
    createdAt: "2026-09-22T10:27:00.000Z",
  },
  {
    id: "c16",
    postId: "5",
    text: "Unknown plus a parser has paid for itself every time a payload grew a field.",
    author: samir,
    createdAt: "2026-09-15T08:55:00.000Z",
  },
  {
    id: "c17",
    postId: "5",
    text: "I printed this and circled the line about any becoming the type of the module.",
    author: priya,
    createdAt: "2026-09-15T12:18:00.000Z",
  },
  {
    id: "c18",
    postId: "5",
    text: "Role as a union sounds obvious and I still see string in our user type. Fixing that today.",
    author: luis,
    createdAt: "2026-09-16T09:40:00.000Z",
  },
  {
    id: "c19",
    postId: "5",
    text: "The limit living in validation, not in the type, is the distinction I blur. Thank you.",
    author: maya,
    createdAt: "2026-09-16T18:02:00.000Z",
  },
  {
    id: "c20",
    postId: "5",
    text: "I keep a single types file per feature now. It is boring and I love it.",
    author: jonah,
    createdAt: "2026-09-17T07:14:00.000Z",
  },
  {
    id: "c21",
    postId: "6",
    text: "Booting the app to test a required title was our whole suite. It took forty seconds to tell us nothing.",
    author: elena,
    createdAt: "2026-08-30T13:33:00.000Z",
  },
  {
    id: "c22",
    postId: "6",
    text: "The auth cases you listed are the ones I always mean to write and then skip. Author, admin, stranger.",
    author: maya,
    createdAt: "2026-08-31T09:21:00.000Z",
  },
  {
    id: "c23",
    postId: "6",
    text: "A fake repository made the service tests readable. I stopped mocking the entire container.",
    author: priya,
    createdAt: "2026-09-01T11:48:00.000Z",
  },
  {
    id: "c24",
    postId: "7",
    text: "Expand, then backfill, then remove. I have the sentence on a sticky note now.",
    author: luis,
    createdAt: "2026-08-13T10:16:00.000Z",
  },
  {
    id: "c25",
    postId: "7",
    text: "Describing the undo in the pull request has caught two migrations for us already.",
    author: samir,
    createdAt: "2026-08-14T15:02:00.000Z",
  },
  {
    id: "c26",
    postId: "8",
    text: "Not accepting an author id from the client should be the first line of every create-post review.",
    author: maya,
    createdAt: "2026-07-29T08:44:00.000Z",
  },
  {
    id: "c27",
    postId: "9",
    text: "Logging the decision, not the whole request, cleaned up our production noise in a day.",
    author: jonah,
    createdAt: "2026-07-10T12:09:00.000Z",
  },
  {
    id: "c28",
    postId: "9",
    text: "I am guilty of attaching the debugger first. The request id would have answered the last incident.",
    author: luis,
    createdAt: "2026-07-10T18:27:00.000Z",
  },
  {
    id: "c29",
    postId: "9",
    text: "Passwords in dev logs still haunt a repo I left. This is the right kind of strict.",
    author: samir,
    createdAt: "2026-07-11T09:03:00.000Z",
  },
  {
    id: "c30",
    postId: "9",
    text: "Role plus email is enough to explain every 403 we have shipped.",
    author: elena,
    createdAt: "2026-07-11T14:52:00.000Z",
  },
  {
    id: "c31",
    postId: "10",
    text: "Separating the database check from the process check stopped a restart loop for us.",
    author: priya,
    createdAt: "2026-06-19T08:36:00.000Z",
  },
  {
    id: "c32",
    postId: "10",
    text: "Tagging images with the git sha has saved more rollbacks than any dashboard.",
    author: maya,
    createdAt: "2026-06-20T16:11:00.000Z",
  },
  {
    id: "c33",
    postId: "11",
    text: "Page of posts first, then gather by id. I rewrote the same query in the opposite order and I felt it.",
    author: jonah,
    createdAt: "2026-05-23T09:48:00.000Z",
  },
  {
    id: "c34",
    postId: "11",
    text: "Keeping the earlier queries in the history is a kindness to the next person, who will be us.",
    author: samir,
    createdAt: "2026-05-24T13:19:00.000Z",
  },
  {
    id: "c35",
    postId: "11",
    text: "The comment count as one number, not the comment bodies, is the whole performance story of our feed.",
    author: luis,
    createdAt: "2026-05-25T07:55:00.000Z",
  },
];

export function getPost(id: string) {
  return posts.find((post) => post.id === id);
}

export function getUser(id: string) {
  return users.find((user) => user.id === id);
}

export function commentsFor(postId: string) {
  return comments.filter((comment) => comment.postId === postId);
}

export function commentCount(postId: string) {
  return comments.reduce(
    (total, comment) => (comment.postId === postId ? total + 1 : total),
    0,
  );
}

export function postsByAuthor(authorId: string) {
  return posts.filter((post) => post.author.id === authorId);
}
