export const itemComponent = ({ ups, title, permalink }) => `
    <li class="flex items-center gap-4 py-2 px-4 border-b border-black">
      <div class="text-center min-w-8">
        <p class="-mb-3">^</p>
        <p>${ups}</p>
      </div>
      <a href="${permalink}" target="_blank" rel="noreferrer nofollow" class="hover:opacity-70">${title}</a>
    </li>`;
