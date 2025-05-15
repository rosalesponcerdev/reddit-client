import { redditPostBySubreddit } from "../services/http-client.service";
import { itemComponent } from "./item.component";

const cleanAndRefresh = async (listTag, subreddit) => {
  try {
    const list = await redditPostBySubreddit(subreddit);

    listTag.innerHTML = "";

    list.forEach(({ title, ups }) => {
      listTag.innerHTML += itemComponent({ title, ups });
    });
  } catch (error) {}
};

export const LaneComponent = async ({ subreddit }) => {
  try {
    const lineContainer = document.querySelector("#line-container");
    const list = await redditPostBySubreddit(subreddit);

    if (!list) return;

    const id = `id-${crypto.randomUUID()}`;

    const tempElement = document.createElement("div");

    tempElement.innerHTML = `<section
        id="${id}"
        class="relative grow pb-2 min-w-screen md:min-w-96 md:max-w-96 max-h-dvh overflow-y-auto border border-black"
      >
        <div
          class="sticky top-0 bg-white z-10 border-b border-black"
        >
          <div class="flex gap-2 py-2 px-4">
            <h2 class="grow text-center">/r/${subreddit}</h2>

            <div class="relative">
              <button class="ellipsis cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                  />
                </svg>
              </button>
              <div class="actions-box absolute top-5 right-5 min-w-40 bg-white border border-black z-10 hidden">
                <button class="cursor-pointer text-left w-full px-4 py-2 hover:opacity-70 border-b border-black">
                  Refresh
                </button>
                <button class="cursor-pointer text-left w-full px-4 py-2 hover:opacity-70">
                  Delete
                </button>
              </div>
            </div>


          </div>
        </div>

        <ul></ul>
      </section>`;

    const section = tempElement.firstChild;
    lineContainer.appendChild(section);
    tempElement.remove();

    const actionsBox = section.querySelector(".actions-box");

    const [refreshButton, deleteButton] = actionsBox.querySelectorAll("button");
    const laneElement = lineContainer.querySelector(`#${id}`);
    const ellipsisButton = laneElement.querySelector("button.ellipsis");
    const listTag = laneElement.querySelector("ul");

    ellipsisButton.addEventListener("click", (event) => {
      event.stopPropagation();

      actionsBox.classList.toggle("hidden");
    });

    refreshButton.addEventListener("click", (ev) => {
      ev.stopPropagation();
      actionsBox.classList.add("hidden");

      cleanAndRefresh(listTag, subreddit);
    });

    deleteButton.addEventListener("click", (ev) => {
      ev.stopPropagation();

      section.remove();
    });

    list.forEach(({ title, ups, permalink }) => {
      listTag.innerHTML += itemComponent({ title, ups, permalink });
    });
  } catch (error) {}
};
